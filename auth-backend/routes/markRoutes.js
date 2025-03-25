const express = require("express");
const router = express.Router();
const Mark = require("../models/Mark");
const Exam = require("../models/Exam");
const User = require("../models/User");
const authenticate = require("../middleware/auth");

// ✅ Fetch Exam Titles
router.get("/exam-titles", async (req, res) => {
  try {
    const examTitles = await Exam.find().distinct("examTitle"); // Fetch unique exam titles
    res.json(examTitles || []); // Return an empty array if no exams found
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam titles" });
  }
});
// Route to fetch student names
router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ userType: "student" }).select(
      "_id name"
    );
    res.json(
      students.map((student) => ({ id: student._id, name: student.name }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});
// Route to fetch student marks

router.get("/exams/:examTitle/:studentName", async (req, res) => {
  try {
    const { examTitle, studentName } = req.params;

    // Fetch all marks for the given student and exam title
    const marksData = await Mark.find({ examTitle, studentName });

    if (!marksData.length) {
      return res
        .status(404)
        .json({ message: "No marks found for the student in this exam" });
    }

    // Group the results by subject and calculate total marks
    const response = {
      examTitle: examTitle,
      studentName: studentName,
      totalMarks: marksData.reduce((sum, entry) => sum + entry.marks, 0),
      subjectWiseMarks: marksData.map((entry) => ({
        subjectName: entry.subjectName,
        marks: entry.marks,
      })),
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching marks:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/subject-wise-marks/:examTitle", async (req, res) => {
  try {
    const { examTitle } = req.params;

    const subjectMarks = await Mark.aggregate([
      { $match: { examTitle } },
      {
        $group: {
          _id: "$subjectName",
          highestMarks: { $max: "$marks" },
          lowestMarks: { $min: "$marks" },
        },
      },
    ]);

    res.json(subjectMarks);
  } catch (error) {
    console.error("❌ Error fetching subject-wise marks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/rank-list/:examTitle", async (req, res) => {
  try {
    const { examTitle } = req.params;

    const rankList = await Mark.aggregate([
      { $match: { examTitle } }, // Filter by exam
      {
        $group: {
          _id: "$studentId",
          studentName: { $first: "$studentName" },
          totalMarks: { $sum: "$marks" },
        },
      },
      { $sort: { totalMarks: -1 } }, // Sort in descending order
    ]);

    res.json(rankList);
  } catch (error) {
    console.error("❌ Error fetching rank list:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/average-marks/:examTitle", async (req, res) => {
  try {
    const { examTitle } = req.params;

    const subjectAverages = await Mark.aggregate([
      { $match: { examTitle } }, // Filter by exam
      {
        $group: {
          _id: "$subjectName",
          averageMarks: { $avg: "$marks" },
        },
      },
      postman,
    ]);

    res.json(subjectAverages);
  } catch (error) {
    console.error("❌ Error fetching average marks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch Students & Subjects for Selected Exam
router.get("/exams/:examTitle", async (req, res) => {
  try {
    const { examTitle } = req.params;

    const exam = await Exam.findOne({ examTitle });
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const students = await User.find({ userType: "student" }).select(
      "_id name"
    );

    res.json({ subjects: exam.subjects, students });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Store Student Marks
// ✅ Store Student Marks (Updated)
router.post("/marks", async (req, res) => {
  try {
    console.log("Incoming request data:", req.body); // 🛠️ Debugging

    const { examTitle, marks } = req.body;

    if (!examTitle || !marks || !Array.isArray(marks)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Ensure each mark entry has required fields
    for (const m of marks) {
      if (!m.studentId || !m.studentEmail || !m.totalMarks) {
        return res
          .status(400)
          .json({ message: "Missing required fields in marks array" });
      }
    }

    // Prepare data for insertion
    const marksData = marks.map((m) => ({
      examTitle,
      studentId: m.studentId,
      studentEmail: m.studentEmail, // ✅ Ensure this is included
      studentName: m.studentName,
      subjectCode: m.subjectCode,
      subjectName: m.subjectName,
      marks: m.marks,
      totalMarks: m.totalMarks, // ✅ Ensure this is included
    }));

    console.log("Processed marksData:", marksData); // 🛠️ Debugging

    await Mark.insertMany(marksData);
    res.json({ message: "Marks saved successfully" });
  } catch (error) {
    console.error("❌ Error saving marks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch Top 3 Overall Performers
router.get("/top-performers/:examTitle", async (req, res) => {
  try {
    const { examTitle } = req.params;

    const topPerformers = await Mark.aggregate([
      { $match: { examTitle } }, // Filter by exam
      {
        $group: {
          _id: "$studentId",
          studentName: { $first: "$studentName" },
          totalMarks: { $sum: "$marks" },
        },
      },
      { $sort: { totalMarks: -1 } },
      { $limit: 3 },
    ]);

    res.json(topPerformers);
  } catch (error) {
    console.error("❌ Error fetching top performers:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Filter Students Based on Marks
router.get("/filter-students", async (req, res) => {
  try {
    const { examTitle, subjectName, min, max } = req.query;
    const minMarks = parseInt(min) || 0;
    const maxMarks = parseInt(max) || 100;

    const filteredStudents = await Mark.find({
      examTitle,
      subjectName,
      marks: { $gte: minMarks, $lte: maxMarks },
    }).select("studentName subjectName marks -_id");

    res.json(filteredStudents);
  } catch (error) {
    console.error("❌ Error filtering students:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Find First Mark (Highest Score) in Each Subject
router.get("/first-mark/:examTitle", async (req, res) => {
  try {
    const { examTitle } = req.params;

    const firstMarks = await Mark.aggregate([
      { $match: { examTitle } }, // Filter by exam
      {
        $group: {
          _id: "$subjectName",
          highestMarks: { $max: "$marks" },
          student: { $first: "$studentName" },
        },
      },
    ]);

    res.json(firstMarks);
  } catch (error) {
    console.error("❌ Error fetching first marks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Pass & Fail Count
router.get("/pass-fail-count", async (req, res) => {
  try {
    const { examTitle, subjectName } = req.query;

    const passCount = await Mark.countDocuments({
      examTitle,
      subjectName,
      marks: { $gte: 40 },
    });

    const failCount = await Mark.countDocuments({
      examTitle,
      subjectName,
      marks: { $lt: 40 },
    });

    res.json({ pass: passCount, fail: failCount });
  } catch (error) {
    console.error("❌ Error fetching pass/fail count:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
