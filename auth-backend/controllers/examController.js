const Exam = require("../models/exam");

// Schedule Exams
exports.scheduleExam = async (req, res) => {
  try {
    const { examTitle, exams } = req.body;

    if (!examTitle || !exams.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExam = new Exam({ examTitle, exams });
    await newExam.save();

    res.status(201).json({ message: "Exams scheduled successfully!" });
  } catch (error) {
    console.error("Error scheduling exam:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all exams
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
