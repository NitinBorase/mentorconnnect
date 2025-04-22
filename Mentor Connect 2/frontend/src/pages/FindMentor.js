import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindMentor = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const menteeEmail = localStorage.getItem("email");
  const [sentMentors, setSentMentors] = useState([]); 
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/mentor");
        console.log(res.data);
        setMentors(res.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const handleConnect = async (mentorEmail, date) => {
    try {
      const response = await axios.post("http://localhost:5000/api/request", {
        menteeEmail,
        mentorEmail,
        date
      });

      if (response.data.message === "Request sent successfully") {
        setSentMentors((prev) => [...prev, mentorEmail]);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage("Request already sent");
      } else {
        setErrorMessage("Failed to send request");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Find a Mentor</h1>
        <button 
          onClick={() => navigate("/home")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
        >
          Back to Dashboard
        </button>
      </header>

      <main className="container mx-auto p-8">
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <div key={mentor._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
                <h2 className="text-xl font-bold">{mentor.name || "Unnamed Mentor"}</h2>
                <p className="text-gray-600">Expertise: {mentor.specialization || "Not specified"}</p>
                <p className="text-gray-500">Experience: {mentor.experience || "Not provided"}</p>
                <p className="text-gray-500">Select date for session: 
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="border px-2 py-1 rounded"
                />.
                </p>
                <button 
                onClick={() => handleConnect(mentor.email, selectedDate)}
                disabled={sentMentors.includes(mentor.email)}
                className={`mt-4 px-4 py-2 rounded-md ${
                  sentMentors.includes(mentor.email)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {sentMentors.includes(mentor.email) ? "Sent" : "Connect"}
              </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No mentors available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default FindMentor;