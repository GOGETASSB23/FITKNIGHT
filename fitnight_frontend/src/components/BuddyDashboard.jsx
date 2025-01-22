// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect } from 'react';
import { Search, Bell, Settings,  MapPin, Filter, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './BuddyDashboard.css';
import axios from 'axios';
const BuddyDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [buddies, setBuddies] = useState([]);


  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };
  useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Replace with your token storage mechanism
        const response = await axios.get("/api/dashboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBuddies(response.data.workout_buddies);
      } catch (error) {
        console.error("Failed to fetch buddies:", error);
      }
    };

    fetchBuddies();
  }, []);
  const handleConnectClick = (buddyId) => {
    navigate(`/buddy/${buddyId}`);
  };


  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-content">
          <div className="logo-container">
            <div className="logo">FK</div>
            <h1>FitKnight</h1>
          </div>
          <div className="nav-actions">
            <Bell className="icon" />
            <Settings className="icon" onClick={handleSettingsClick} />
            <div className="avatar" onClick={handleProfileClick}>
              <img src="/api/placeholder/100/100" alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome, Fitness Crusader</h2>
          <p>Ready to find your workout partner in crime?</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input type="text" placeholder="Search for workout buddies..." />
          </div>
          <button className="filter-button">
            <Filter /> Filters
          </button>
        </div>

        {/* Main Grid */}
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="main-column">
            {/* Buddy Recommendations */}
            <div className="card buddy-recommendations">
              <h3>Recommended Workout Partners</h3>
              {[1, 2, 3].map((i) => (
                <div key={i} className="buddy-card">
                  <div className="buddy-info">
                    <div className="avatar">
                      <img src="/api/placeholder/100/100" alt={`Buddy ${i}`} />
                    </div>
                    <div className="buddy-details">
                      <h4>Gotham Fitness Warrior {i}</h4>
                      <div className="location-info">
                        <MapPin className="icon-small" />
                        <span>2km away • </span>
                        <span>🏋️‍♂️ Strength Training</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="connect-button"
                    onClick={() => handleConnectClick(i)}
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>

            {/* Available Groups */}
            <div className="card available-groups">
              <h3>Fitness Groups Near You</h3>
              {[1, 2].map((i) => (
                <div key={i} className="group-card">
                  <div className="group-info">
                    <div className="avatar">
                      <img src="/api/placeholder/100/100" alt={`Group ${i}`} />
                    </div>
                    <div className="group-details">
                      <h4>Gotham&#39;s Elite Training {i}</h4>
                      <div className="group-meta">
                        <Calendar className="icon-small" />
                        <span>Daily sessions • </span>
                        <span>👥 15 members</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="view-button"
                    onClick={() => handleGroupClick(i)}
                  >
                    View Group
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="side-column">
            {/* Quick Filters */}
            <div className="card quick-filters">
              <h3>Quick Filters</h3>
              {['Strength Training', 'Cardio', 'Yoga', 'CrossFit'].map((filter) => (
                <button
                  key={filter}
                  className={`filter-option ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Activity Feed */}
            <div className="card activity-feed">
              <h3>Recent Activity</h3>
              {[1, 2, 3].map((i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot"></div>
                  <p>New workout buddy match found in your area!</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuddyDashboard;