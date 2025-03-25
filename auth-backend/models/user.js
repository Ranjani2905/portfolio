const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      required: true,
      enum: ["student", "admin", "staff"],
      studentId: { type: String, unique: true, sparse: true }, //
    },
  },
  { timestamps: true }
);

// Prevent Overwriting the Model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
