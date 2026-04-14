import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://markdown-app-roof.onrender.com";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note (with validation ✅)
  const addNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
      });
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📝 Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br /><br />

      <button onClick={addNote}>Add Note</button>

      <hr />

      <h2>All Notes</h2>

      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{note.title || "No Title"}</h3>
            <p>{note.content || "No Content"}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;