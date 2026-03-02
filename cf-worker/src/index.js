/**
 * Cloudflare Worker + D1 CRUD API
 * Binding attendu dans wrangler.toml :
 * [[d1_databases]]
 * binding = "DB"
 */

function json(data, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(data, null, 2), {
        status,
        headers: {
            "content-type": "application/json; charset=utf-8",
            ...extraHeaders,
        },
    });
}

function corsHeaders(req) {
    const origin = req.headers.get("Origin") || "*";
    // Tu peux restreindre plus tard à ton domaine Pages
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin",
    };
}

function handleOptions(req) {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
}

function slugify(str) {
    return String(str || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // accents
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function makeProjectId(projectName, client) {
    return `${slugify(projectName)}__${slugify(client)}`;
}

function makeLabel(projectName, client) {
    const pn = (projectName || "").trim();
    const cl = (client || "").trim();
    return pn && cl ? `${pn} — ${cl}` : "";
}

function notFound(req) {
    return json({ error: "NOT_FOUND" }, 404, corsHeaders(req));
}

async function readJson(req) {
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("application/json")) return null;
    return await req.json();
}

export default {
    async fetch(req, env) {
        const url = new URL(req.url);
        const { pathname } = url;

        // CORS preflight
        if (req.method === "OPTIONS") return handleOptions(req);

        // Helpers headers
        const CORS = corsHeaders(req);

        // Health
        if (req.method === "GET" && pathname === "/api/health") {
            return json({ ok: true, time: new Date().toISOString() }, 200, CORS);
        }

        // ---- GET /api/projects (list)
        if (req.method === "GET" && pathname === "/api/projects") {
            const rows = await env.DB.prepare(
                `SELECT id, label, meta_json, saved_at
         FROM projects
         ORDER BY saved_at DESC`
            ).all();

            const list = (rows.results || []).map((r) => {
                let meta = {};
                try {
                    meta = JSON.parse(r.meta_json || "{}");
                } catch { }
                return {
                    id: r.id,
                    label: r.label || makeLabel(meta.projectName, meta.client),
                    projectName: meta.projectName || "",
                    client: meta.client || "",
                    projectManager: meta.projectManager || "",
                    bu: meta.bu || "",
                    savedAt: r.saved_at || "",
                };
            });

            return json(list, 200, CORS);
        }

        // ---- GET /api/projects/:id
        const projectIdMatch = pathname.match(/^\/api\/projects\/([^/]+)$/);
        if (req.method === "GET" && projectIdMatch) {
            const id = decodeURIComponent(projectIdMatch[1]);

            const row = await env.DB.prepare(
                `SELECT id, label, meta_json, criteria_json, saved_at
         FROM projects
         WHERE id = ?`
            )
                .bind(id)
                .first();

            if (!row) return notFound(req);

            let meta = {};
            let criteria = {};
            try {
                meta = JSON.parse(row.meta_json || "{}");
            } catch { }
            try {
                criteria = JSON.parse(row.criteria_json || "{}");
            } catch { }

            return json(
                {
                    id: row.id,
                    label: row.label || makeLabel(meta.projectName, meta.client),
                    meta,
                    criteria,
                    savedAt: row.saved_at,
                },
                200,
                CORS
            );
        }

        // ---- DELETE /api/projects/:id
        if (req.method === "DELETE" && projectIdMatch) {
            const id = decodeURIComponent(projectIdMatch[1]);

            const res = await env.DB.prepare(`DELETE FROM projects WHERE id = ?`)
                .bind(id)
                .run();

            // D1 : changes = nb lignes affectées
            if (!res.success || (res.meta?.changes ?? 0) === 0) return notFound(req);

            return json({ ok: true }, 200, CORS);
        }

        // ---- POST /api/projects (upsert)
        if (req.method === "POST" && pathname === "/api/projects") {
            const body = await readJson(req);
            if (!body) return json({ error: "JSON_REQUIRED" }, 400, CORS);

            const meta = body.meta || {};
            const projectName = (meta.projectName || "").trim();
            const client = (meta.client || "").trim();

            if (!projectName || !client) {
                return json({ error: "PROJECT_NAME_AND_CLIENT_REQUIRED" }, 400, CORS);
            }

            const id = makeProjectId(projectName, client);
            const label = body.label || makeLabel(projectName, client);

            const metaJson = JSON.stringify(
                {
                    projectName,
                    client,
                    projectManager: (meta.projectManager || "").trim(),
                    bu: (meta.bu || "").trim(),
                },
                null,
                0
            );

            const criteriaJson = JSON.stringify(body.criteria || {}, null, 0);
            const savedAt = new Date().toISOString();

            // Upsert SQLite
            await env.DB.prepare(
                `INSERT INTO projects (id, label, meta_json, criteria_json, saved_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           label = excluded.label,
           meta_json = excluded.meta_json,
           criteria_json = excluded.criteria_json,
           saved_at = excluded.saved_at`
            )
                .bind(id, label, metaJson, criteriaJson, savedAt)
                .run();

            return json({ ok: true, id }, 200, CORS);
        }

        return json({ error: "NOT_FOUND" }, 404, CORS);
    },
};