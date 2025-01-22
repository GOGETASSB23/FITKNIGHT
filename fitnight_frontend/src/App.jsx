import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";  // Import your Home component
import WorkoutBuddyProfileForm from "./components/WorkoutBuddyProfileForm";
import FitnessGroupOrganizerForm from "./components/FitnessGroupOrganizerForm";
//import Dashboard from "./components/Dashboard";
import ChoicePage from "./components/ChoicePage";
import BuddyDashboard from "./components/BuddyDashboard";
import GroupDashboard from "./components/GroupDashboard";

function App() {
  return (
    <Router>
      {/* Now, useNavigate can be used within these components */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for the root path */}
        <Route path="/signup" element={<SignUp />} /> {/* SignUp route */}
        <Route path="/choice" element={<ChoicePage />} />
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/workout-buddy-form" element={<WorkoutBuddyProfileForm />} />
        <Route path="/fitness-group-form" element={<FitnessGroupOrganizerForm />}/>
        <Route path="/buddy-dashboard" element={<BuddyDashboard />}/>

        <Route path="/group-dashboard" element={<GroupDashboard />} />
        {/* Dynamic route for the dashboard */}
        {/*<Route
          path="/dashboard/:goal"
          element={<Dashboard />} // This component will handle dynamic content
        />*/}
      </Routes>
    </Router>
  );
}

export default App;
