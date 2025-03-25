const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  resourcePerson: { type: String, required: true },
});

module.exports = mongoose.model("Announcement", announcementSchema);
