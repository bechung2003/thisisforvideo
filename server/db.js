import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the server directory and uploads directory exist
const dbPath = path.join(__dirname, 'portfolio.db');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to SQLite Database
export const db = new Database(dbPath);

// Enable WAL mode for high performance and durability
db.pragma('journal_mode = WAL');

// Initialize database tables
export function initDatabase() {
  // 1. Projects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      category TEXT DEFAULT 'Web Development',
      summary TEXT NOT NULL,
      tags TEXT DEFAULT '[]',
      image TEXT,
      github_url TEXT,
      live_url TEXT,
      features TEXT DEFAULT '[]',
      is_custom INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Contact Messages Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default portfolio project if empty
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
  if (projectCount === 0) {
    const insertProject = db.prepare(`
      INSERT INTO projects (
        id, title, subtitle, category, summary, tags, image, github_url, live_url, features, is_custom
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertProject.run(
      'personal-portfolio',
      'Personal Portfolio Website',
      'Responsive Developer Portfolio Built with React & Vite',
      'Web Development',
      'A clean, modern, and fully responsive personal portfolio designed to showcase my learning journey, skills, and projects as an aspiring software developer.',
      JSON.stringify(['React', 'JavaScript', 'HTML5', 'Vanilla CSS', 'Vite']),
      '/images/project-fintech.jpg',
      'https://github.com/bechung2003',
      '#hero',
      JSON.stringify([
        'Fully responsive layout across mobile, tablet, and desktop screens',
        'Clean, modern aesthetic with coral and subtle blue accents',
        'Interactive sections for About Me, Skills, Projects, and Contact',
        'Working contact form with feedback and one-click email copying',
      ]),
      0
    );

    console.log('✔ Initialized SQLite database with starter project.');
  }
}
