const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

/*
  @route   POST /api/students
  @desc    Add a new student
*/
router.post("/", async (req, res) => {
  try {
    const { name, email, department, year } = req.body;

    // Basic validation
    if (!name || !email || !department || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Create new student
    const newStudent = new Student({
      name,
      email,
      department,
      year
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully",
      student: newStudent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
  @route   GET /api/students
  @desc    Get all students
*/
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
