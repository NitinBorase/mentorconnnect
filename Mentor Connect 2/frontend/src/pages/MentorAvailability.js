import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const slots = ["10:00-12:00 AM", "12:00-2:00 PM", "2:00-4:00 PM", "4:00-6:00 PM", "6:00:-8:00 PM"];

const MentorAvailability = () => {
  const mentorEmail = localStorage.getItem("email"); 
  const [availability, setAvailability] = useState({});
  const navigate = useNavigate();

  const handleCheckboxChange = (day, slot) => {
    setAvailability((prev) => {
      const daySlots = prev[day] || [];
      return {
        ...prev,
        [day]: daySlots.includes(slot)
          ? daySlots.filter((s) => s !== slot)
          : [...daySlots, slot],
      };
    });
  };

  const handleSave = async () => {
    const formatted = Object.entries(availability).map(([day, slots]) => ({ day, slots }));
    await axios.post("http://localhost:5000/api/availability", {
      mentorEmail,
      availability: formatted,
    });
    alert("Availability saved!");
    navigate("/mentor-home");
  };

    const email = localStorage.getItem("email"); //check email
    console.log(email);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Set Your Availability</h2>
      {days.map((day) => (
        <div key={day} className="mb-3">
          <h3 className="font-semibold">{day}</h3>
          <div className="flex gap-4 flex-wrap">
            {slots.map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={availability[day]?.includes(slot) || false}
                  onChange={() => handleCheckboxChange(day, slot)}
                />
                {slot}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Availability
      </button>
    </div>
  );
};

export default MentorAvailability;