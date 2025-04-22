const express = require("express");
const router = express.Router();
const Availability = require("../models/MentorAvailability");

// Save or update availability
router.post("/", async (req, res) => {
  const { mentorEmail, availability } = req.body;

  try {
    const existing = await Availability.findOne({ mentorEmail });

    if (existing) {
      existing.availability = availability;
      await existing.save();
    } else {
      await Availability.create({ mentorEmail, availability });
    }

    res.status(200).json({ message: "Availability saved" });
  } catch (err) {
    console.error("Error saving availability:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get mentor availability
router.get("/:email", async (req, res) => {
  try {
    const data = await Availability.findOne({ email });
    res.status(200).json(data.availability);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch availability" });
  }
});

module.exports = router;