const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentEmail: { type: String, required: true }, // ✅ Required
  studentName: { type: String, required: true },
  examTitle: { type: String, required: true },
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  marks: { type: Number, required: true },
  totalMarks: { type: Number, required: true }, // ✅ Required
});

const Mark = mongoose.model("Mark", MarkSchema);
module.exports = Mark;
