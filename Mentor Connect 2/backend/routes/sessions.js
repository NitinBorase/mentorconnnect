const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

router.get("/:menteeEmail", async (req, res) => {
  try {
    const sessions = await Request.find({ menteeEmail: req.params.menteeEmail });
    res.status(200).json(sessions);
  } catch (err) {
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

module.exports = router;
