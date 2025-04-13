const dotenv = require("dotenv");
const express = require("express");
const app = express();

const taskRoutes = require("./routes/taskRoutes.js");

const mongoose = require("mongoose");

dotenv.config();

app.use(express.json());
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => res.send("Task API is running"));
app.use("/api/tasks", taskRoutes);
