import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUS from "./components/AboutUS";
import About from "./components/About";
import AlertState from "./context/alert/alertState";
import Alert from "./components/Alert";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Signup from "./components/Auth/Signup";
import Settings from "./components/Settings"; // Import the Settings component
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import ThemeState from "./context/theme/themeState"; // Import the ThemeState

function App() {
  return (
    <>
      <AlertState>
        <NoteState>
          <ThemeState>
            <Router>
              <Navbar />
              <Alert />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/aboutUs" element={<AboutUS />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </Router>
          </ThemeState>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
