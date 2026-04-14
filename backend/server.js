const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('notes.db');

app.use(cors());
app.use(express.json());

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  )
`).run();

// Test route
app.get('/', (req, res) => {
  res.send("Backend running 🚀");
});

// GET all notes
app.get('/notes', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM notes").all();
    res.json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE a note
app.post('/notes', (req, res) => {
  try {
    const { title, content } = req.body;

    const result = db
      .prepare("INSERT INTO notes (title, content) VALUES (?, ?)")
      .run(title, content);

    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE a note
app.put('/notes/:id', (req, res) => {
  try {
    const { title, content } = req.body;

    db.prepare(
      "UPDATE notes SET title = ?, content = ? WHERE id = ?"
    ).run(title, content, req.params.id);

    res.json({ message: "Updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a note
app.delete('/notes/:id', (req, res) => {
  try {
    db.prepare("DELETE FROM notes WHERE id = ?").run(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});