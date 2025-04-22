import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signup } from "../services/api"; 

const Signup = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("mentee");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await signup({ email, password, role });
      
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("token", response.email);
        if (role === "mentor") {
          navigate("/mentor-home");  
        } else {
          navigate("/home");  
        }
      } else {
        console.error("Token not received in the response.");
        alert("Signup failed: Token not received.");
      }
    } catch (error) {
      console.error("Signup failed:", error.response ? error.response.data : error.message);
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-600 text-center">Sign Up</h2>

        <form onSubmit={handleSignup} className="mt-6">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <label className="block text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;