import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Area from "./Area";
import Login from "./Login";
import Logout from "./Logout";
import { auth } from "./firebase";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios.get('https://comsw3102finalbackend.onrender.com/notes')
      .then(response => {
        setNotes(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const addNote = (newNote) => {
    axios.post('https://comsw3102finalbackend.onrender.com/notes', newNote)
      .then(response => {
        const addedNote = response.data;
        setNotes(prevNotes => [...prevNotes, addedNote]);
        fetchNotes(); 
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  

  const deleteNote = (id) => {
    axios.delete(`https://comsw3102finalbackend.onrender.com/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.href = "/login";
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Header />
        {user && <Logout handleLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/notes"
            element={
              user ? (
                <div>
                  <Area onAdd={addNote} />
                  {notes.map((note) => (
                    <Note
                      key={note._id}
                      id={note._id}
                      title={note.title}
                      content={note.content}
                      onDelete={deleteNote}
                    />
                  ))}
                </div>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;