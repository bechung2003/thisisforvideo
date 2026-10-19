import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { db, initDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite database & tables
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for local image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || '.png';
    cb(null, 'project-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (PNG, JPG, WebP) are allowed!'));
    }
  },
});

// =========================================================================
// REST API ROUTES
// =========================================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'running', database: 'connected' });
});

// 1. GET /api/projects - Retrieve all projects from SQLite
app.get('/api/projects', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
    const formatted = rows.map((row) => ({
      ...row,
      tags: JSON.parse(row.tags || '[]'),
      features: JSON.parse(row.features || '[]'),
      isCustom: Boolean(row.is_custom),
      githubUrl: row.github_url,
      liveUrl: row.live_url,
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to retrieve projects from database' });
  }
});

// 2. POST /api/projects - Add a new project into SQLite
app.post('/api/projects', (req, res) => {
  try {
    const {
      title,
      subtitle = '',
      category = 'Web Development',
      summary,
      tags = [],
      image = '/images/project-fintech.jpg',
      githubUrl = '',
      liveUrl = '',
      features = [],
    } = req.body;

    if (!title || !summary) {
      return res.status(400).json({ error: 'Title and summary are required.' });
    }

    const id = `project-${Date.now()}`;
    const insert = db.prepare(`
      INSERT INTO projects (
        id, title, subtitle, category, summary, tags, image, github_url, live_url, features, is_custom
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `);

    insert.run(
      id,
      title.trim(),
      subtitle.trim(),
      category.trim(),
      summary.trim(),
      JSON.stringify(Array.isArray(tags) ? tags : []),
      image,
      githubUrl ? githubUrl.trim() : null,
      liveUrl ? liveUrl.trim() : null,
      JSON.stringify(Array.isArray(features) ? features : [])
    );

    const created = {
      id,
      title,
      subtitle,
      category,
      summary,
      tags,
      image,
      githubUrl,
      liveUrl,
      features,
      isCustom: true,
      created_at: new Date().toISOString(),
    };

    res.status(201).json(created);
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ error: 'Failed to save project to database' });
  }
});

// 3. POST /api/projects/upload-image - Upload project image file
app.post('/api/projects/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ imageUrl, filename: req.file.filename });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// 4. DELETE /api/projects/:id - Delete a project by ID from SQLite
app.delete('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM projects WHERE id = ?').run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project successfully deleted', id });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project from database' });
  }
});

// 5. POST /api/contact - Save contact message to SQLite
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject = '', message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const insert = db.prepare(`
      INSERT INTO messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `);

    const result = insert.run(name.trim(), email.trim(), subject.trim(), message.trim());

    res.status(201).json({
      message: 'Message received and saved to database successfully!',
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

// 6. GET /api/contact - View received contact messages
app.get('/api/contact', (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 REST API Backend server running at http://localhost:${PORT}`);
  console.log(`📁 Database connected: server/portfolio.db`);
});
