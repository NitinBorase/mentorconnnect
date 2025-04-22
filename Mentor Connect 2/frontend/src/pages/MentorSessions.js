import React, { useEffect, useState } from "react";
import axios from "axios";

const MentorSessions = () => {
  const [sessions, setSessions] = useState([]);
  const mentorEmail = localStorage.getItem("email"); 

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/request/accepted/${mentorEmail}`);
        setSessions(res.data);
      } catch (error) {
        console.error("Error fetching accepted sessions", error);
      }
    };

    if (mentorEmail) {
      fetchSessions();
    }
  }, [mentorEmail]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-700">📅 Scheduled Sessions</h2>

      {sessions.length === 0 ? (
        <p className="mt-4 text-gray-600">No upcoming sessions</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {sessions.map((session) => (
            <li key={session._id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-lg font-medium">📆 {session.requestedDate}</p>
              <p className="text-gray-700">👨‍🎓 Mentee: {session.menteeEmail}</p>
              <p className="text-gray-700">Time to Join: {session.timetojoin}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorSessions;