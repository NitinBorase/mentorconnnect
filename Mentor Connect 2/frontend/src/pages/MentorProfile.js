import React, { useEffect, useState } from "react";
import axios from "axios";

const MentorProfile = () => {
  const [mentor, setMentor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    bio: "",
  });

  const email = localStorage.getItem("email"); //check email 
  console.log(email);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/mentor/${email}`);
      setMentor(res.data);
      setForm(res.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await axios.put(`http://localhost:5000/api/mentor/${email}`, form);
    setMentor(res.data);
    setIsEditing(false);
  };

  if (!mentor) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-700">👤 Mentor Profile</h2>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md space-y-2">
        {isEditing ? (
          <>
            <h3 className="text-xl font-semibold">Edit Profile</h3>
            <label className="block text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <label className="block text-gray-700">Specialization</label>
            <input
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <label className="block text-gray-700">Experience</label>
            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold">Name: {mentor.name}</p>
            <p>Email: {mentor.email}</p>
            <p>Specialization: {mentor.specialization}</p>
            <p>Experience: {mentor.experience}</p>
            <p>Bio: {mentor.bio}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;