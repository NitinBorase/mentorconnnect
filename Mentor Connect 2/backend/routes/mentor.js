const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");

router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentors" });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ email: req.params.email });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mentor" });
  }
});

//for update
router.put("/:email", async (req, res) => {
  try {
    const updatedMentor = await Mentor.findOneAndUpdate(
      { email: req.params.email },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedMentor);
  } catch (err) {
    res.status(500).json({ error: "Failed to update mentor" });
  }
});

router.put("/profile", async (req, res) => {
    const { email, name, specialization, experience, bio } = req.body;
  
    try {
      const updated = await Mentor.findOneAndUpdate(
        { email },
        { name, specialization, experience, bio },
        { new: true, upsert: true } // create if not exists
      );
  
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update mentor profile" });
    }
});  

module.exports = router;