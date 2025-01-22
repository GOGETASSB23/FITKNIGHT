// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Search, Bell, Settings, Users, Calendar, MapPin, Filter} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './GroupDashboard.css';

const GroupDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSettingsClick = () => {
    navigate('/organizer/settings');
  };

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}/manage`);
  };

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All Groups' },
    { id: 'active', label: 'Active Groups' },
    { id: 'pending', label: 'Pending Requests' },
    { id: 'nearby', label: 'Nearby Members' }
  ];

  // Example group data
  const groups = [
    { id: 1, name: 'Elite Training Group 1', status: 'active', members: 25, location: 'Central Gym', schedule: 'Mon, Wed, Fri - 6:00 PM' },
    { id: 2, name: 'Elite Training Group 2', status: 'pending', members: 15, location: 'City Park', schedule: 'Tue, Thu - 7:00 PM' },
    { id: 3, name: 'Elite Training Group 3', status: 'active', members: 30, location: 'Sports Complex', schedule: 'Mon, Wed, Fri - 8:00 PM' },
  ];

  // Filter groups based on activeFilter and searchTerm
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || group.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-content">
          <div className="logo-container">
            <div className="logo">FK</div>
            <h1>FitKnight Groups</h1>
          </div>
          <div className="nav-actions">
            <Bell className="icon" />
            <Settings className="icon" onClick={handleSettingsClick} />
            <div className="avatar">
              <img src="/api/placeholder/100/100" alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome, Group Organizer</h2>
          <p>Manage your fitness groups and connect with members</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search members or groups..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <Filter /> Filters
          </button>
        </div>

        {/* Main Grid */}
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="main-column">
            {/* My Groups */}
            <div className="card my-groups">
              <h3>My Fitness Groups</h3>
              {filteredGroups.map((group) => (
                <div key={group.id} className="group-card">
                  <div className="group-info">
                    <div className="avatar">
                      <img src="/api/placeholder/100/100" alt={`Group ${group.id}`} />
                    </div>
                    <div className="group-details">
                      <h4>{group.name}</h4>
                      <div className="group-meta">
                        <Users className="icon-small" />
                        <span>{group.members} members • </span>
                        <MapPin className="icon-small" />
                        <span>{group.location}</span>
                      </div>
                      <div className="schedule-info">
                        <Calendar className="icon-small" />
                        <span>{group.schedule}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="manage-button"
                    onClick={() => handleGroupClick(group.id)}
                  >
                    Manage Group
                  </button>
                </div>
              ))}
            </div>

            {/* Member Requests */}
            <div className="card member-requests">
              <h3>Pending Member Requests</h3>
              {[1, 2].map((i) => (
                <div key={i} className="request-card">
                  <div className="member-info">
                    <div className="avatar">
                      <img src="/api/placeholder/100/100" alt={`Member ${i}`} />
                    </div>
                    <div className="member-details">
                      <h4>John Doe {i}</h4>
                      <p>Interested in Elite Training Group {i}</p>
                      <div className="member-meta">
                        <MapPin className="icon-small" />
                        <span>2km away • </span>
                        <span>Intermediate Level</span>
                      </div>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button className="accept-button">Accept</button>
                    <button className="decline-button">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="side-column">
            {/* Quick Filters */}
            <div className="card quick-filters">
              <h3>Quick Filters</h3>
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-option ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="card quick-stats">
              <h3>Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <h4>Total Members</h4>
                  <p>156</p>
                </div>
                <div className="stat-item">
                  <h4>Active Groups</h4>
                  <p>{groups.filter(g => g.status === 'active').length}</p>
                </div>
                <div className="stat-item">
                  <h4>Pending Requests</h4>
                  <p>8</p>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="card activity-feed">
              <h3>Recent Activity</h3>
              {[1, 2, 3].map((i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot"></div>
                  <p>New member request for Elite Training Group {i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupDashboard;