import "./App.css";
import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import AlertState from "./context/alert/alertState";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <AlertState>
            <Alert />
          <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          </div>
          </AlertState>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
