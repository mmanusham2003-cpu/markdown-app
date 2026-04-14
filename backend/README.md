#  Markdown Notes Application

A full-stack Notes App with Markdown support, built using React, Node.js, and SQLite.

---

##  Features

* Create, edit, and delete notes
* Live Markdown preview (split-screen)
* Auto-save functionality
* Persistent storage using SQLite
* Clean and simple UI

---

##  Tech Stack

* Frontend: React.js
* Backend: Node.js (Express)
* Database: SQLite

---

## Setup Instructions

### 1. Clone the repository

git clone <your-repo-link>

### 2. Backend Setup

cd backend
npm install
node server.js

Server runs on: http://localhost:5000

---

### 3. Frontend Setup

cd frontend
npm install
npm start

App runs on: http://localhost:3000

---

##  API Endpoints

 GET /notes → Fetch all notes
 POST /notes → Create a note
 PUT /notes/:id → Update a note
 DELETE /notes/:id → Delete a note

---

##  Bonus Features

 Auto-save using debounce
 Live preview with React Markdown

---

##  Demo

(Attach demo video link here)

---

##  Future Improvements

 Authentication (JWT)
 Search functionality
 Dark mode
 Tags / categories
