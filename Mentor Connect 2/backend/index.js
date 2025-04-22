const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const mentorRoutes = require("./routes/mentor");
app.use("/api/mentor", mentorRoutes);

const availabilityRoutes = require("./routes/availability");
app.use("/api/availability", availabilityRoutes);

app.use("/api/request", require("./routes/request"));

const frontend = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use("/api/sessions", require("./routes/sessions"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));