const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String,
  bio: String,
  experience: String
});

module.exports = mongoose.model("Mentor", mentorSchema);