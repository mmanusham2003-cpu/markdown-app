// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://markdown-app-roof.onrender.com";
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  const fetchNotes = async () => {
    const res = await fetch(`${API_URL}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
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
  };

  // Delete note
  const deleteNote = async (id) => {
    await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    });
    fetchNotes();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📝 Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={addNote}>Add Note</button>

      <hr />

      <h2>All Notes</h2>
      {notes.map((note) => (
        <div key={note.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;