const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Assignment = require("../models/Assignments");

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/upload-assignment",
  upload.single("assignment"),
  async (req, res) => {
    try {
      const { studentName, assignmentTitle } = req.body;
      const file = req.file;

      if (!studentName || !assignmentTitle || !file) {
        return res.status(400).json({ message: "All fields are required" });
      }

      console.log("Received Upload:", { studentName, assignmentTitle, file });

      // Find assignment
      let assignment = await Assignment.findOne({
        title: new RegExp(`^${assignmentTitle}$`, "i"),
      });

      if (!assignment) {
        console.log("Assignment not found, creating a new one...");
        assignment = new Assignment({
          title: assignmentTitle,
          submissions: [],
        });
      }

      // Ensure submissions array exists
      if (!assignment.submissions) {
        assignment.submissions = [];
      }

      // Add submission
      assignment.submissions.push({
        studentName,
        fileUrl: file.filename,
        uploadedAt: new Date(),
      });

      const savedAssignment = await assignment.save(); // Save to MongoDB

      console.log("Assignment saved to DB:", savedAssignment);

      res.json({
        message: "Assignment uploaded successfully!",
        fileUrl: file.filename,
      });
    } catch (error) {
      console.error("Error uploading assignment:", error);
      res.status(500).json({ message: "Error uploading assignment", error });
    }
  }
);
router.get("/view-assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find();

    // Flatten data: Extract submissions from each assignment
    const formattedAssignments = assignments.flatMap((assignment) =>
      assignment.submissions.map((submission) => ({
        assignmentTitle: assignment.title, // Get assignment title
        studentName: submission.studentName, // Get student name
        fileUrl: `http://localhost:5000/uploads/${submission.fileUrl}`, // Generate file URL
      }))
    );

    console.log("Formatted Assignments:", formattedAssignments); // Debugging log
    res.json(formattedAssignments); // Send formatted response
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: "Error fetching assignments", error });
  }
});

module.exports = router;
