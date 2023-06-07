import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import Dashboard from "./components/Dashboard";
import ItemTable from "./components/ItemTable";
import ItemForm from "./components/ItemForm";

const App = () => {
  const [sessionID, setSessionID] = useState("");
  const [currentRoute, setCurrentRoute] = useState("");
  const [shouldUpdateItems, setShouldUpdateItems] = useState(false);

  useEffect(() => {
    const storedSessionID = localStorage.getItem("sessionID");
    const storedRoute = localStorage.getItem("currentRoute");

    if (storedSessionID) {
      setSessionID(storedSessionID);
    }

    if (storedRoute) {
      setCurrentRoute(storedRoute);
    }
  }, []);

  useEffect(() => {
    if (sessionID) {
      localStorage.setItem("sessionID", sessionID);
    } else {
      localStorage.removeItem("sessionID");
    }
  }, [sessionID]);

  useEffect(() => {
    if (currentRoute) {
      localStorage.setItem("currentRoute", currentRoute);
    } else {
      localStorage.removeItem("currentRoute");
    }
  }, [currentRoute]);
  const handleShouldUpdateItems = (value) => {
    setShouldUpdateItems(value);
  };
  const handleItemAdded = () => {
    setShouldUpdateItems(true);
  };

  return (
    <Router>
      {sessionID && <Navbar setSessionID={setSessionID} />}
      <Routes>
        <Route
          path="/"
          element={
            sessionID ? (
              <Navigate to={currentRoute || "/dashboard"} replace />
            ) : (
              <LoginPage setSessionID={setSessionID} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={sessionID ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/inventory"
          element={
            <ItemForm
              onItemAdded={handleItemAdded}
              setShouldUpdateItems={handleShouldUpdateItems}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
