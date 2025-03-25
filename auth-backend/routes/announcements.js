const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");

console.log("✅ Announcements route loaded");

// ✅ Add a new announcement
router.post("/add", async (req, res) => {
  try {
    console.log("Received request:", req.body); // ✅ Debugging
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.json({ message: "Announcement added successfully!" });
  } catch (error) {
    console.error("Error adding announcement:", error);
    res.status(500).json({ error: "Server error!" });
  }
});

// ✅ Fetch all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

module.exports = router; // ✅ Ensure this is present
