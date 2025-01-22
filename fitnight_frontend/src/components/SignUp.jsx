import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import "./SignUp.css";
import axios from "axios";
import usernameIcon from "../assets/username.png";
import passwordIcon from "../assets/password.png";
import defaultProfile from "../assets/defaultProfile.jpeg";
import Batman from "../assets/Batman.jpeg";


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState(""); // To show success or error messages
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle Input Change for Username and Password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Profile Picture Upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file); // Save the file for submission
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    if (profilePic) {
      data.append("profile_picture", profilePic);
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle Success Response
      setMessage("Registration successful! You can now log in.");
      setFormData({ username: "", password: "" });
      setProfilePic(null);

      // Redirect to the login page after successful registration
      setTimeout(() => {
        navigate("/choice");  // Use navigate to go to the login page (not directly to dashboard)
      }, 2000);
    } catch (error) {
      // Handle Error Response
      setMessage(error.response?.data?.error || "Something went wrong! Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Left Half - Empty */}
      <div className="left-half">
        <img
          src={Batman} // Replace with your image URL
          alt="Batman"
          className="batman-image"
        />
      </div>

      {/* Right Half - SignUp Form */}
      <div className="right-half">
        <div className="title-left">
          SO PICK YOURSELF UP AND GET STARTED WITH <strong>FITNIGHT</strong>
        </div>
        <div className="login-container">
          <h2 className="login-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="input-group">
              <img src={usernameIcon} alt="Username" className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="input-group">
              <img src={passwordIcon} alt="Password" className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Upload a Profile Picture */}
            <div className="input-group">
              <img
                src={profilePic ? URL.createObjectURL(profilePic) : defaultProfile}
                alt="Profile"
                className="input-icon profile-preview"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="file-input"
              />
            </div>

            {/* Submit Button */}
            <div className="button-container">
              <button type="submit" className="submit-button">
                Sign Up
              </button>
            </div>

            <div className="login-link">
              <p>
                Already have an account?  <Link to="/login">LOGIN</Link>
              </p>
            </div>
          </form>

          {/* Display Message */}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
