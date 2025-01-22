import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fitnessQuotes = [
    "I am the night... of fitness!",
    "It's not who you are underneath, it's what you workout that defines you.",
    "The night is darkest before the dawn of your fitness journey.",
    "Why do we fall? So we can learn to pick up weights and get back up."
  ];

  const features = [
    {
      title: "Find Workout Buddies",
      description: "Connect with like-minded fitness enthusiasts in your area."
    },
    {
      title: "Create Fitness Groups",
      description: "Form or join workout groups that match your fitness goals."
    },
    {
      title: "Track Progress",
      description: "Monitor your fitness journey like Batman monitors Gotham."
    },
    {
      title: "24/7 Support",
      description: "We're always here, like the hero you deserve."
    }
  ];

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">FitKnight</div>
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#about">About</a>
          <a href="#help">Help</a>
          <button onClick={() => navigate('/login')} className="nav-button">Login</button>
          <button onClick={() => navigate('/signup')} className="nav-button signup">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to FitKnight</h1>
          <p>The fitness app Gotham deserves</p>
          <button onClick={() => navigate('/signup')} className="cta-button">
            Begin Your Journey
          </button>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-container">
          {fitnessQuotes.map((quote, index) => (
            <div key={index} className="quote-card">
              {quote}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="about">
        <h2>Why Choose FitKnight?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="help-section" id="help">
        <h2>Need Assistance?</h2>
        <p>Our support team is available 24/7 to help you on your fitness journey.</p>
        <button onClick={() => navigate('/contact')} className="help-button">
          Contact Support
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 FitNight - The Dark Knight of Fitness Apps</p>
      </footer>
    </div>
  );
};

export default Home;
