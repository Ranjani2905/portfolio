const mongoose = require("mongoose"); // ✅ Import mongoose

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["Present", "Absent", "On Duty"],
    required: true,
  },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
});

module.exports = mongoose.model("Attendance", attendanceSchema);
