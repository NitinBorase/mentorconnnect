const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  menteeEmail: { type: String, required: true },
  mentorEmail: { type: String, required: true },
  status: { type: String, default: "pending" }, // pending, accepted, rejected
  createdAt: { type: Date, default: new Date().toLocaleDateString("en-CA")},
  requestedDate: { type: Date},
  timetojoin: { type: String, default: "-----"}
});

module.exports = mongoose.model("Request", requestSchema);
