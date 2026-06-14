import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "waitlist.db");

let _db: Database.Database | null = null;

export function getDb() {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.exec(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
  }
  return _db;
}

export function insertEmail(email: string): { ok: boolean; duplicate: boolean } {
  const db = getDb();
  try {
    db.prepare("INSERT INTO waitlist (email) VALUES (?)").run(email.toLowerCase().trim());
    return { ok: true, duplicate: false };
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("UNIQUE")) {
      return { ok: true, duplicate: true };
    }
    throw err;
  }
}

export function getAllEmails(): { id: number; email: string; created_at: string }[] {
  return getDb().prepare("SELECT * FROM waitlist ORDER BY created_at DESC").all() as {
    id: number;
    email: string;
    created_at: string;
  }[];
}

export function getCount(): number {
  const row = getDb().prepare("SELECT COUNT(*) as n FROM waitlist").get() as { n: number };
  return row.n;
}
