import './output.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import FindMentor from './pages/FindMentor';
import UpcomingSessions from './pages/UpcomingSessions';
import VideoCalls from './pages/VideoCalls';
import MentorHome from './pages/MentorHome';
import MentorSessions from './pages/MentorSessions';
import MentorProfile from './pages/MentorProfile';
import MentorRequests from './pages/MentorRequests';
import MentorAvailability from './pages/MentorAvailability';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/find-mentor" element={<FindMentor />} />
        <Route path="/upcoming-sessions" element={<UpcomingSessions />} />
        <Route path="/video-calls" element={<VideoCalls />} />
        <Route path="/mentor-home" element={<MentorHome />} />
        <Route path="/mentor-sessions" element={<MentorSessions />} />
        <Route path="/mentor-profile" element={<MentorProfile />} />
        <Route path="/mentee-requests" element={<MentorRequests />} />
        <Route path="/mentor-availability" element={<MentorAvailability />} />
      </Routes>
    </Router>
  );
}

export default App;
