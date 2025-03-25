const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  rubrics: [
    {
      criteria: String,
      marks: Number,
    },
  ],
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
