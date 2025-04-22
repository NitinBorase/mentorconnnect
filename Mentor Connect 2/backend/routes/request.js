const express = require("express");
const router = express.Router();
const Request = require("../models/Request"); // Import Request model

router.post("/", async (req, res) => {
  const { menteeEmail, mentorEmail, date } = req.body;

  try {
    // Check if request already exists
    const existingRequest = await Request.findOne({ menteeEmail, mentorEmail });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" }); // Return error if already sent
    }

    // Create a new request
    const newRequest = new Request({
      menteeEmail,
      mentorEmail,
      status: "pending",
      requestedDate: date,
      timetojoin: "-----",
    });

    await newRequest.save();
    res.status(200).json({ message: "Request sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:mentorEmail", async (req, res) => {
  const { mentorEmail } = req.params;
  try {
    const requests = await Request.find({ mentorEmail: req.params.mentorEmail });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, stime } = req.body; // Accepted or Rejected

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status, timetojoin: stime },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: "Failed to update request" });
  }
});

router.get("/accepted/:mentorEmail", async (req, res) => {
  const { mentorEmail } = req.params;

  try {
    const acceptedRequests = await Request.find({
      status: "Accepted",
      mentorEmail: mentorEmail
    });
    res.json(acceptedRequests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch accepted sessions" });
  }
});

module.exports = router;