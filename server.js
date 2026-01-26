require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Score = require("./models/Score");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Neon Runner Backend is Running 🚀");
});

// Save score
app.post("/api/score", async (req, res) => {
  try {
    const { name, score } = req.body;

    const newScore = new Score({ name, score });
    await newScore.save();

    res.status(201).json({ message: "Score saved!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Get leaderboard
app.get("/api/score", async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));