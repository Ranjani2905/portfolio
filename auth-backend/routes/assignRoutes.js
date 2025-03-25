const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignments");

// ✅ Add Assignment
router.post("/add", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Assignment title is required" });
    }

    // Check if assignment already exists
    const existingAssignment = await Assignment.findOne({
      title: new RegExp(`^${title}$`, "i"),
    });
    if (existingAssignment) {
      return res.status(400).json({ message: "Assignment already exists" });
    }

    const newAssignment = new Assignment({ title });
    await newAssignment.save();

    res.status(201).json({ message: "Assignment added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
