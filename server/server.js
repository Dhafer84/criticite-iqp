import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// --- Paths ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "db", "projects.json");

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Optionnel : servir un frontend depuis /public
app.use(express.static(path.join(__dirname, "public")));

// --- Helpers ---
async function ensureDbFile() {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify({ projects: [] }, null, 2), "utf-8");
    }
}

async function readDb() {
    await ensureDbFile();
    const raw = await fs.readFile(DB_PATH, "utf-8");
    try {
        const data = JSON.parse(raw);
        if (!data.projects || !Array.isArray(data.projects)) return { projects: [] };
        return data;
    } catch {
        return { projects: [] };
    }
}

async function writeDb(db) {
    await ensureDbFile();
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
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

// ID unique = Nom + Client
function makeProjectId(projectName, client) {
    return `${slugify(projectName)}__${slugify(client)}`;
}

function nowIso() {
    return new Date().toISOString();
}

function makeLabel(projectName, client) {
    const pn = (projectName || "").trim();
    const cl = (client || "").trim();
    return pn && cl ? `${pn} — ${cl}` : "";
}

// --- Routes ---
app.get("/api/health", (req, res) => res.json({ ok: true, time: nowIso() }));

// List all projects (for dropdown)
app.get("/api/projects", async (req, res) => {
    const db = await readDb();

    const list = db.projects
        .map((p) => {
            const projectName = p.meta?.projectName ?? "";
            const client = p.meta?.client ?? "";
            return {
                id: p.id,
                label: p.label || makeLabel(projectName, client),
                projectName,
                client,
                projectManager: p.meta?.projectManager ?? "",
                bu: p.meta?.bu ?? "",
                savedAt: p.savedAt ?? "",
            };
        })
        .sort((a, b) => (a.label || a.id).localeCompare(b.label || b.id));

    res.json(list);
});

// Read one project
app.get("/api/projects/:id", async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    const project = db.projects.find((p) => p.id === id);
    if (!project) return res.status(404).json({ error: "NOT_FOUND" });
    res.json(project);
});

// Upsert project (create or update)
app.post("/api/projects", async (req, res) => {
    const body = req.body || {};
    const meta = body.meta || {};

    const projectName = (meta.projectName || "").trim();
    const client = (meta.client || "").trim();

    if (!projectName || !client) {
        return res.status(400).json({ error: "PROJECT_NAME_AND_CLIENT_REQUIRED" });
    }

    // ID calculé (référence)
    const computedId = makeProjectId(projectName, client);

    // Si le frontend envoie un id, on le respecte,
    // mais on vérifie qu’il correspond bien à Nom+Client (anti doublons / incohérence)
    const incomingId = (body.id || "").trim();
    const id = incomingId || computedId;

    if (incomingId && incomingId !== computedId) {
        return res.status(400).json({
            error: "ID_MISMATCH",
            message: "L'id envoyé ne correspond pas à Nom+Client.",
            expected: computedId,
            received: incomingId,
        });
    }

    const label = body.label || makeLabel(projectName, client);

    const project = {
        id,
        label,
        meta: {
            projectName,
            client,
            projectManager: (meta.projectManager || "").trim(),
            bu: (meta.bu || "").trim(),
        },
        criteria: body.criteria || {},
        savedAt: nowIso(),
    };

    const db = await readDb();
    const idx = db.projects.findIndex((p) => p.id === id);

    if (idx >= 0) db.projects[idx] = project;
    else db.projects.push(project);

    await writeDb(db);

    res.json({ ok: true, id });
});

// Delete project
app.delete("/api/projects/:id", async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    const before = db.projects.length;

    db.projects = db.projects.filter((p) => p.id !== id);

    if (db.projects.length === before) {
        return res.status(404).json({ error: "NOT_FOUND" });
    }

    await writeDb(db);
    res.json({ ok: true });
});

// --- Start ---
app.listen(PORT, async () => {
    await ensureDbFile();
    console.log(`IQP backend running on http://localhost:${PORT}`);
    console.log(`DB file: ${DB_PATH}`);
});