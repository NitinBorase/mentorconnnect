import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios"; 

const MentorHome = () => {
  const [exp, setexp] = useState(null);
  const [em, setem] = useState(true);
  const navigate = useNavigate();

  const email = localStorage.getItem("email"); //check email 
  console.log(email);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/mentor/${email}`);
      setexp(res.data.experience);
      setem(res.data.email);
    };
    fetchData();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

//   if (loading) {
//     return <p className="text-center text-gray-600">Loading...</p>; // Show loading until data is ready
//   }

//   if (!mentor) {
//     return <p className="text-center text-red-500">Error loading profile.</p>; // Handle missing data
//   }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mentor Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {em}! 🎓
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Your Profile</h3>
            <p className="text-gray-600 mt-2">Experience: {exp}</p>
            <p className="text-gray-600 mt-1">Email: {em}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              <Link to={"/mentor-profile"}>View Profile</Link>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Your Sessions</h3>
            <p className="text-gray-600 mt-2">Manage your scheduled mentorship sessions.</p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              <Link to={"/mentor-sessions"}>View Sessions</Link>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Mentee Requests</h3>
            <p className="text-gray-600 mt-2">Review new mentee requests and accept them.</p>
            <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              <Link to={"/mentee-requests"}>View Requests</Link>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Video Calls</h3>
            <p className="text-gray-600 mt-2">Start or join mentorship video calls.</p>
            <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
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

export default MentorHome;