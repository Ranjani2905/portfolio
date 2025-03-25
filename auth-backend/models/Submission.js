const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  assignmentTitle: { type: String, required: true },
  studentName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
