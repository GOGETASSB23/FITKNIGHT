import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FitnessGroupOrganizerForm.css";

const FitnessGroupOrganizerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    activity_type: "",
    location: "",
    schedule: "",
    description: ""
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/fitness-group/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Fitness group created successfully!");
        navigate("/group-dashboard"); // Navigate to dashboard after success
      }
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to create fitness group. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="workoutbuddy-body">
      <div className="fitness-form-container">
        <h1>Join a Fitness Group</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Group Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter group name"
              required
            />
          </div>

          <div className="form-group">
            <label>Activity Type:</label>
            <input
              type="text"
              name="activity_type"
              value={formData.activity_type}
              onChange={handleChange}
              placeholder="e.g., Yoga, Running Club"
              required
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., City park, Gym"
              required
            />
          </div>

          <div className="form-group">
            <label>Schedule:</label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              placeholder="e.g., Every Saturday at 8 AM"
              required
            />
          </div>

          

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? 'submit-button loading' : 'submit-button'}
          >
            {isSubmitting ? 'Creating Group...' : 'Create Group'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FitnessGroupOrganizerForm;