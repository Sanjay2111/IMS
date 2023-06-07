import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import About from "./components/About";

const App = () => {
  const [sessionID, setSessionID] = useState("");

  // Check for session ID in localStorage on initial load
  useEffect(() => {
    const storedSessionID = localStorage.getItem("sessionID");
    if (storedSessionID) {
      setSessionID(storedSessionID);
    }
  }, []);

  // Update localStorage when session ID changes
  useEffect(() => {
    if (sessionID) {
      localStorage.setItem("sessionID", sessionID);
    } else {
      localStorage.removeItem("sessionID");
    }
  }, [sessionID]);

  return (
    <Router>
      <Navbar setSessionID={setSessionID} />
      <Routes>
        <Route
          path="/"
          element={
            sessionID ? (
              <Navigate to="/home" />
            ) : (
              <LoginPage setSessionID={setSessionID} />
            )
          }
        />
        <Route
          path="/home"
          element={sessionID ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/contact"
          element={sessionID ? <Contact /> : <Navigate to="/" />}
        />
        <Route
          path="/about"
          element={sessionID ? <About /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
