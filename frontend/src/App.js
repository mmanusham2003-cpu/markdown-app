import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://markdown-app-roof.onrender.com";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [draft, setDraft] = useState(null);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Prepare note (Add button)
  const prepareNote = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    setDraft({ title, content });
    alert("Note ready! Click Save to store.");
  };

  // Save note (Save button)
  const saveNote = async () => {
    if (!draft) {
      alert("No note to save");
      return;
    }

    try {
      await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });

      setTitle("");
      setContent("");
      setDraft(null);
      fetchNotes();
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>📝 Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={prepareNote}>Add Note</button>
        <button onClick={saveNote}>💾 Save</button>
      </div>

      <hr />

      <h2>All Notes</h2>

      {notes.length === 0 ? (
        <p>No notes available</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;