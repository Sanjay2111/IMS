import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  // Check for stored login state on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedLoggedIn = localStorage.getItem("loggedIn");

    if (storedToken && storedLoggedIn === "true") {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  // Update stored login state whenever it changes
  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("loggedIn", loggedIn ? "true" : "false");
  }, [token, loggedIn]);

  return (
    <Router>
      {loggedIn && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<LoginPage setLoggedIn={setLoggedIn} setToken={setToken} />}
        />
        {loggedIn && <Route path="/home" element={<Home token={token} />} />}
        {loggedIn && (
          <Route path="/contact" element={<Contact token={token} />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
