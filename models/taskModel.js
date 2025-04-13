// models/taskModel.js
const mongoose = require("mongoose");
const statusEnum = require("../constants/taskStatus");

const taskSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: statusEnum,
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model("Task", taskSchema);
