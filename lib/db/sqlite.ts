import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'stores.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

export function getDb() {
  return db;
}

export function initDb() {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      business_hours TEXT NOT NULL,
      access TEXT NOT NULL,
      floor TEXT,
      area_feel TEXT,
      toilet_congestion TEXT,
      map_image_url TEXT,
      has_power_outlet INTEGER DEFAULT 0,
      latitude REAL,
      longitude REAL,
      station_distance TEXT,
      cigarette_smell TEXT,
      has_nearby_water INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

export default db;
