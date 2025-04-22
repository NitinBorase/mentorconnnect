const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  mentorEmail: { type: String, required: true },
  availability: [
    {
      day: String,
      slots: [String]
    }
  ]
});

const Availability = mongoose.model("Availability", AvailabilitySchema);

module.exports = Availability;