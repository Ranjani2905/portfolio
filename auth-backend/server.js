require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const authRoutes = require("./routes/authRoutes");
const assignRoutes = require("./routes/assignRoutes");
const examRoutes = require("./routes/examRoutes");
const marksRoutes = require("./routes/markRoutes");
const attendanceRoutes = require("./routes/attendance");
const announcementRoutes = require("./routes/announcements");
const submissionRoutes = require("./routes/submissionRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignRoutes);
app.use("/api", examRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/announcements", announcementRoutes);
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post("http://localhost:8000/chat", {
      message,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Chatbot API failed" });
  }
});

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 5000;

// ✅ Updated MongoDB Connection (Remove Deprecated Options)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
