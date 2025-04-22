import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MentorRequests = () => {
  const [requests, setRequests] = useState([]);
  const mentorEmail = localStorage.getItem("email");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/request/${mentorEmail}`);
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/request/${id}`, {
        status: "Accepted",
        stime: time
      });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? res.data : req))
      );
      alert("Request accepted successfully!");
      navigate("/mentor-home");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/request/${id}`, {
        status: "Rejected",
        stime: time
      });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? res.data : req))
      );
      navigate("/mentor-home");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-700">📩 Mentor Requests</h2>
      <p className="mt-2 text-gray-600">
        Review and respond to mentee session requests.
      </p>

      {requests.length === 0 ? (
        <p className="mt-6 text-gray-500">No new requests at the moment.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <p className="text-lg font-semibold">
                {req.email} wants to discuss{" "}
              </p>
              <p className="text-md font-semibold">
                Requested Date: {req.requestedDate}
              </p>
              Time: {req.timetojoin}
              <p
                className={`text-sm mt-1 ${
                  req.status === "Accepted"
                    ? "text-green-500"
                    : req.status === "Rejected"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                Status: {req.status}
              </p>
              {req.status === "pending" && (
                <div className="mt-3 flex space-x-4">
                  <label htmlFor="time" className="block mb-2 font-medium">Enter time for session joining(am/pm):</label>
                  <input
                    type="String"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border border-blue-500 px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleAccept(req._id, time)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    ✅ Accept
                  </button>
                  <button
                    onClick={() => handleReject(req._id, time)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorRequests;