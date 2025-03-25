const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  examTitle: { type: String, required: true, unique: true },
  subjects: [
    {
      subjectCode: { type: String, required: true },
      subjectName: { type: String, required: true },
      date: { type: String, required: true },
    },
  ],
});

const Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;
