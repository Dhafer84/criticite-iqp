DROP TABLE IF EXISTS projects;

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  label TEXT,
  meta_json TEXT NOT NULL,
  criteria_json TEXT NOT NULL,
  saved_at TEXT NOT NULL
);