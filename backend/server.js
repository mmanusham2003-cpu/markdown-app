const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./notes.db');

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  )
`);

// Test route
app.get('/', (req, res) => {
  res.send("Backend running 🚀");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
// GET all notes
app.get('/notes', (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// CREATE a note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  db.run(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

// UPDATE a note
app.put('/notes/:id', (req, res) => {
  const { title, content } = req.body;

  db.run(
    "UPDATE notes SET title=?, content=? WHERE id=?",
    [title, content, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

// DELETE a note
app.delete('/notes/:id', (req, res) => {
  db.run("DELETE FROM notes WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});