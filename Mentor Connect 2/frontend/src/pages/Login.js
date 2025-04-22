import { Link } from "react-router-dom";
import React, { useState } from "react";             
import { useNavigate } from "react-router-dom";     
import { login } from "../services/api";           

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mentee"); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password, role });
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      console.log("Login successful:", response);
      if(role === "mentor") {
        navigate("/mentor-home"); 
      } else {
        navigate("/home"); 
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-600 text-center">Login</h2>
        
        <form onSubmit={handleLogin} className="mt-6">

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">Login as</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?  
          <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;