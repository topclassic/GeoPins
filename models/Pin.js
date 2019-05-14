const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: String,
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    comments: [
      {
        text: String,
        createAt: { type: Date, default: Date.now },
        author: { type: mongoose.Schema.ObjectId, ref: "User" }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", userSchema);
