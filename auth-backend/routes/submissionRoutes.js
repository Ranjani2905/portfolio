const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Submission = require("../models/Submission");

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/**
 * 📌 Upload Assignment Submission
 * URL: POST /api/upload-submission
 */
router.post(
  "/upload-submission",
  upload.single("assignment"),
  async (req, res) => {
    try {
      const { studentName, assignmentTitle } = req.body;
      const file = req.file;

      if (!studentName || !assignmentTitle || !file) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const submission = new Submission({
        assignmentTitle,
        studentName,
        fileUrl: file.filename,
      });

      await submission.save();

      res.json({
        message: "Submission uploaded successfully!",
        fileUrl: file.filename,
      });
    } catch (error) {
      console.error("Error uploading submission:", error);
      res.status(500).json({ message: "Error uploading submission", error });
    }
  }
);

/**
 * 📌 Get All Submissions
 * URL: GET /api/view-submissions
 */
router.get("/view-submissions", async (req, res) => {
  try {
    const submissions = await Submission.find();

    const formattedSubmissions = submissions.map((submission) => ({
      assignmentTitle: submission.assignmentTitle,
      studentName: submission.studentName,
      fileUrl: `http://localhost:5000/uploads/${submission.fileUrl}`,
    }));

    res.json(formattedSubmissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions", error });
  }
});

module.exports = router;
