const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Score = require("./models/Score");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ message: "Neon Runner API is running ✅" });
});

// ✅ Submit Score
app.post("/api/score", async (req, res) => {
  try {
    const { name, score, highScore, platform } = req.body;

    if (!name || score === undefined) {
      return res.status(400).json({ error: "Name and score required" });
    }

    const newScore = await Score.create({
      name,
      score,
      highScore: highScore || 0,
      platform: platform || "web"
    });

    res.json({ message: "Score saved ✅", data: newScore });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Leaderboard Top 10
app.get("/api/leaderboard", async (req, res) => {
  try {
    const top = await Score.find().sort({ score: -1 }).limit(10);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Connect DB and start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Mongo error:", err));
