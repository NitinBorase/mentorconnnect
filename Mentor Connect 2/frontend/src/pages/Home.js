import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react"; 
import { getProfile } from "../services/api"; 

const AfterLogin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const email = localStorage.getItem("email"); //check email
  console.log(email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mentor Connect</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {email} 🎉</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Find a Mentor</h3>
            <p className="text-gray-600 mt-2">
              Connect with industry experts to boost your skills.
            </p>
            <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              <Link to={"/find-mentor"}>Browse Mentors</Link>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Upcoming Sessions</h3>
            <p className="text-gray-600 mt-2">
              View and manage your scheduled mentorship sessions.
            </p>
            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              <Link to={"/upcoming-sessions"}>View Sessions</Link>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Video Calls</h3>
            <p className="text-gray-600 mt-2">
              Join or schedule video calls with your mentors.
            </p>
            <button className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
              <Link to={"/video-calls"}>Start a Call</Link>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        © 2025 Mentor Connect. All Rights Reserved.
      </footer>
    </div>
  );
};

export default AfterLogin;
