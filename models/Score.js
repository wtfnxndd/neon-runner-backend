const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 20 },
    score: { type: Number, required: true },
    highScore: { type: Number, default: 0 },
    platform: { type: String, default: "web" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", scoreSchema);
