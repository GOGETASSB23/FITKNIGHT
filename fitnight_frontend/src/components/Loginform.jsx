import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents default form submission

    try {
      // Send POST request to backend to get tokens
      const response = await axios.post('http://127.0.0.1:8090/auth/token/', {
        username: username,
        password: password,
      });

      // Extract tokens from response
      const { access, refresh } = response.data;
      console.log("Access Token:", access);
      console.log("Refresh Token:", refresh);

      // Store tokens in localStorage or global state
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Redirect user to a different page (e.g., dashboard)
      window.location.href = "/dashboard"; // Replace with your protected page

    } catch (error) {
      setError("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
