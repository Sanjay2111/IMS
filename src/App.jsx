import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      {loggedIn && <Navbar />}{" "}
      {/* Render the Navbar component only if loggedIn is true */}
      <Routes>
        <Route path="/" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        {loggedIn && <Route path="/home" element={<Home />} />}{" "}
        {loggedIn && <Route path="/contact" element={<Contact />} />}{" "}
      </Routes>
    </Router>
  );
};

export default App;
