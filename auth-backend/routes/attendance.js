const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance");

// ✅ Route to mark attendance
router.post("/mark-attendance", async (req, res) => {
  try {
    console.log("✅ Received Request:", req.body);

    const { date, attendance } = req.body;
    if (!date || !attendance || attendance.length === 0) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    for (let entry of attendance) {
      const { id: studentId, name, status } = entry;

      let existingRecord = await Attendance.findOne({ studentId, date });

      if (existingRecord) {
        existingRecord.status = status;
        await existingRecord.save();
      } else {
        const newAttendance = new Attendance({ studentId, name, status, date });
        await newAttendance.save();
      }
    }

    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (error) {
    console.error("❌ Error storing attendance:", error);
    res.status(500).json({ message: "Error storing attendance", error });
  }
});

// ✅ Route to get attendance summary
router.get("/summary", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const presentCount = await Attendance.countDocuments({
      date,
      status: "Present",
    });
    const absentCount = await Attendance.countDocuments({
      date,
      status: "Absent",
    });
    const onDutyCount = await Attendance.countDocuments({
      date,
      status: "On Duty",
    });

    res.status(200).json({
      present: presentCount,
      absent: absentCount,
      onDuty: onDutyCount,
    });
  } catch (error) {
    console.error("❌ Error fetching summary:", error);
    res.status(500).json({ message: "Error fetching summary", error });
  }
});
// ✅ Route to fetch a student's attendance records
// ✅ Route to fetch a student's attendance records
router.get("/student/:name", async (req, res) => {
  try {
    const studentName = req.params.name;

    if (!studentName) {
      return res.status(400).json({ message: "Student name is required" });
    }

    const attendanceRecords = await Attendance.find({ name: studentName });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("❌ Error fetching student attendance:", error);
    res
      .status(500)
      .json({ message: "Error fetching attendance records", error });
  }
});

module.exports = router;
