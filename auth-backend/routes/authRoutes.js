const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔹 Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, userType } = req.body;
    if (!name || !email || !userType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
    });
    await newUser.save();

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Account Details",
      text: `Hello ${name},\n\nYour account has been created.\nLogin Credentials:\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) console.error("Email Error:", error);
    });

    res.status(201).json({
      success: true,
      message: "User registered and credentials sent via email!",
    });
    
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
  try {
    console.log("📥 Login Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

// 🔹 Student Details Route (✅ Now it's outside the login function!)
router.get("/student/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const student = await User.findOne({ email, userType: "student" });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ id: student._id, name: student.name });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student details", error });
  }
});

// 🔹 Get All Users Based on User Type
router.get("/users/:userType", async (req, res) => {
  try {
    const { userType } = req.params;

    if (!["student", "staff", "admin"].includes(userType)) {
      return res.status(400).json({ error: "Invalid user type" });
    }

    const users = await User.find({ userType });
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Fetch Users Error:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

// 🔹 Admin Stats Route
router.get("/admin/stats", async (req, res) => {
  try {
    const studentsCount = await User.countDocuments({ userType: "student" });
    const teachersCount = await User.countDocuments({ userType: "staff" });

    res.json({ students: studentsCount, teachers: teachersCount });
  } catch (error) {
    console.error("❌ Error in /admin/stats:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

// 🔹 Get All Students
router.get("/student", async (req, res) => {
  try {
    const students = await User.find({ userType: "student" }).select(
      "_id name"
    );
    res.json(
      students.map((student) => ({ id: student._id, name: student.name }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});
router.put("/users/student/change-password/:id", async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.params.id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in DB
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/users/student/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
