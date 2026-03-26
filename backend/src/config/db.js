import Database from "better-sqlite3";
import fs from "fs";

const dataDir = "./src/data";

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const db = new Database(`${dataDir}/Todo.db`);
db.pragma("journal_mode=WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS tokens (
        id TEXT PRIMARY KEY,
        iv TEXT NOT NULL,
        ciphertext TEXT NOT NULL,
        auth_tag TEXT NOT NULL
    );
`);

export { db };
