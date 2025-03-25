const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const User = require("../models/User");
const Mark = require("../models/Mark"); // Import Mark model

// ✅ Fetch All Exam Titles
router.get("/exam-titles", async (req, res) => {
  try {
    const exams = await Exam.find().select("examTitle -_id"); // Fetch only examTitle
    res.json(exams);
  } catch (error) {
    console.error("❌ Error fetching exam titles:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch Subjects & Students for Selected Exam
router.get("/exams/:examTitle", async (req, res) => {
  try {
    const { examTitle } = req.params;
    console.log("Fetching exam:", examTitle);

    const exam = await Exam.findOne({ examTitle });
    if (!exam) {
      console.log("❌ Exam not found in the database!");
      return res.status(404).json({ message: "Exam not found" });
    }

    console.log("✅ Exam found:", exam);
    console.log("✅ Subjects retrieved:", exam.subjects);

    const students = await User.find({ userType: "student" }).select(
      "_id name"
    );

    res.json({
      subjects: exam.subjects, // This should contain subjects
      students,
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Schedule Exam Route (Prevents Duplicate Exams)
router.post("/schedule-exam", async (req, res) => {
  try {
    const { examTitle, subjects } = req.body;

    console.log("📌 Received Data:", req.body);

    if (
      !examTitle ||
      !subjects ||
      !Array.isArray(subjects) ||
      subjects.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Exam title and subjects are required!" });
    }

    // 🔴 Check if exam already exists
    const existingExam = await Exam.findOne({ examTitle });
    if (existingExam) {
      return res
        .status(400)
        .json({ message: "Exam with this title already exists!" });
    }

    // Remove duplicate subjects within the same exam
    const uniqueSubjects = [];
    const subjectCodes = new Set();
    subjects.forEach((subject) => {
      if (!subjectCodes.has(subject.subjectCode)) {
        subjectCodes.add(subject.subjectCode);
        uniqueSubjects.push(subject);
      }
    });

    const newExam = new Exam({ examTitle, subjects: uniqueSubjects });
    await newExam.save();

    console.log("✅ Exam scheduled successfully!");
    res.json({ message: "Exam scheduled successfully!" });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Store Student Marks
router.post("/marks", async (req, res) => {
  try {
    const { marks } = req.body;

    if (!marks || !Array.isArray(marks)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Store each mark entry
    await Mark.insertMany(marks);

    res.json({ message: "Marks saved successfully" });
  } catch (error) {
    console.error("❌ Error saving marks:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ Fetch All Scheduled Exams with Subjects & Dates
router.get("/all-exams", async (req, res) => {
  try {
    const exams = await Exam.find().select("examTitle subjects -_id");

    if (!exams || exams.length === 0) {
      return res.status(404).json({ message: "No exams found!" });
    }

    res.json(exams);
  } catch (error) {
    console.error("❌ Error fetching all exams:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
