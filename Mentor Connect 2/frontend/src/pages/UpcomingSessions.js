import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UpcomingSessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const menteeEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sessions/${menteeEmail}`);
        console.log(res.data);
        setSessions(res.data);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [menteeEmail]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Upcoming Sessions</h1>
        <button 
          onClick={() => navigate("/home")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg ml-4 hover:bg-blue-100"
        >
          Back to Dashboard
        </button>
      </header>

      <main className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Your Sessions</h2>

          {loading ? (
            <p>Loading...</p>
          ) : sessions.length === 0 ? (
            <p className="text-gray-600">No upcoming sessions found.</p>
          ) : (
            <ul className="space-y-4">
              {sessions.map((session) => (
                <li key={session._id} className="p-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold">Mentor Email : {session.mentorEmail}</h3>
                  <p className="text-gray-600">Request Sent At : {session.createdAt}</p>
                  <p className="text-gray-600">Requested Date : {session.requestedDate}</p>
                  <p className={`text-${session.status === "Accepted" ? "green" : "yellow"}-500`}>
                    Status : {session.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default UpcomingSessions;