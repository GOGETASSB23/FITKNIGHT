import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [message, setMessage] = useState(""); // State for feedback message

  // Check login status and redirect appropriately
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login state
    const userGoal = localStorage.getItem("fitnessGoal"); // Retrieve goal from localStorage

    if (isLoggedIn) {
      // If logged in but no goal is set, redirect to choice page
      if (!userGoal) {
        navigate("/choice");
      } 
    }
  }, [navigate]);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // For simplicity, assume any username and password is valid
    if (username && password) {
      // Save login state to localStorage
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);

      // Redirect to choice page to select a fitness goal
      navigate("/choice");
    } else {
      setMessage("Please enter both username and password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>FitKnight</h2>
        <p>Rise of the Fitness Crusaders</p>
        <h3>Login to FitKnight</h3>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Feedback Message */}
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
