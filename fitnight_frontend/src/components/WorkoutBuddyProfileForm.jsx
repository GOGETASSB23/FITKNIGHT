import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Calendar, Target, Clock } from "lucide-react";
import "./WorkoutBuddyProfileForm.css";
import axios from "axios";

const WorkoutBuddyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fitnessGoals: [],
    workoutPreferences: [],
    availability: {
      days: [],
      timePreference: "",
    },
    experienceLevel: "",
    preferredLocation: "",
  });

  const fitnessGoalsOptions = [
    "muscle_gain",
    "weight_gain", 
    "weight_loss",
    "improve_stamina",
    "improve_strength",
    "calm_mind"
  ];
  const handleFitnessGoalChange = (goal) => {
    setFormData(prev => ({
      ...prev,
      fitnessGoals: prev.fitnessGoals.includes(goal)
        ? prev.fitnessGoals.filter(g => g !== goal)
        : [...prev.fitnessGoals, goal]
    }));
  };


  const workoutTypes = [
    "Gym Training",
    "Yoga",
    "Running",
    "Swimming",
    "Cycling",
    "HIIT",
    "Pilates",
    "Boxing",
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Update workout preferences
  const handleWorkoutPreferenceChange = (workout) => {
    setFormData((prev) => ({
      ...prev,
      workoutPreferences: prev.workoutPreferences.includes(workout)
        ? prev.workoutPreferences.filter((w) => w !== workout)
        : [...prev.workoutPreferences, workout],
    }));
  };

  // Update availability days
  const handleDayChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter((d) => d !== day)
          : [...prev.availability.days, day],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transform data for API
  const transformedData = {
    fitness_goals: formData.fitnessGoals,
    workout_preferences: JSON.stringify(formData.workoutPreferences),
    availability: JSON.stringify({
      days: formData.availability.days,
      timePreference: formData.availability.timePreference
    }),
    experience_level: formData.experienceLevel,
    preferred_location: formData.preferredLocation
  };

    // Form validation
    if (
      !formData.fitnessGoals ||
      formData.workoutPreferences.length === 0 ||
      formData.availability.days.length === 0 ||
      !formData.availability.timePreference ||
      !formData.experienceLevel ||
      !formData.preferredLocation
    ) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      const response = await axios.post('/api/workout-buddy-profile/', transformedData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.status === 201) {
        console.log("Form submitted:", formData);
        navigate("/buddy-dashboard", {
          state: { message: "Workout buddy preferences saved successfully!" }
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save preferences. Please try again.");
    }

    
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="page-container">
      <div className="overlay">
        <div className="workout-form-container">
          <h1>
            <Dumbbell className="icon" /> Find Your Workout Buddy
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Fitness Goals */}

            <div className="form-group">
              <label>
                <Target className="icon" /> Your Fitness Goals
              </label>
              <div className="checkbox-grid">
        {fitnessGoalsOptions.map((goal) => (
          <label key={goal} className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.fitnessGoals.includes(goal)}
              onChange={() => handleFitnessGoalChange(goal)}
            />
            {goal.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </label>
        ))}
      </div>
            </div>


            {/* Workout Preferences */}
            <div className="form-group">
              <label>
                <Dumbbell className="icon" /> Workout Preferences
              </label>
              <div className="checkbox-grid">
                {workoutTypes.map((workout) => (
                  <label key={workout} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.workoutPreferences.includes(workout)}
                      onChange={() => handleWorkoutPreferenceChange(workout)}
                    />
                    {workout}
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="form-group">
              <label>
                <Calendar className="icon" /> Availability
              </label>
              <div className="checkbox-grid">
                {daysOfWeek.map((day) => (
                  <label key={day} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.availability.days.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Time */}
            <div className="form-group">
              <label>
                <Clock className="icon" /> Preferred Time
              </label>
              <select
                value={formData.availability.timePreference}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: {
                      ...formData.availability,
                      timePreference: e.target.value,
                    },
                  })
                }
                required
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning (6 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 10 PM)</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="form-group">
              <label>
                <Dumbbell className="icon" /> Experience Level
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) =>
                  setFormData({ ...formData, experienceLevel: e.target.value })
                }
                required
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Preferred Location */}
            <div className="preferred-loc">
              <label>Preferred Location</label>
              <input
                type="text"
                value={formData.preferredLocation}
                onChange={(e) =>
                  setFormData({ ...formData, preferredLocation: e.target.value })
                }
                placeholder="e.g., Downtown Gym, City Park, etc."
                required
              />
            </div>

            {/* Buttons */}
            <div className="button-group">
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Back
              </button>
              <button type="submit" className="submit-button">
                Find My Workout Buddy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutBuddyForm;
