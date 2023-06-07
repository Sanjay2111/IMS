// components/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setLoggedIn, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      const token = response.data; // Extract the token from the response

      if (token) {
        setLoginStatus("Success");
        setLoggedIn(true); // Set loggedIn to true
        setToken(token); // Set the token state
        navigate("/home"); // Navigate to the Home page
      } else {
        setLoginStatus("Failure");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginStatus("Failure");
    }
  };

  const handleGetUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Authorization header with the token
        },
      });

      const users = response.data; // Extract the users from the response

      // Process the list of users as needed
      console.log(users);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loginStatus && (
        <div>
          {loginStatus === "Success" ? (
            <p>Login successful!</p>
          ) : (
            <p>Login failed. Please check your credentials and try again.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
