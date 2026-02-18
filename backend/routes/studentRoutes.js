const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

/**
 * POST - Add student
 */
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET - All students
 */
router.get("/", async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});

/**
 * DELETE - Remove student
 */
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

module.exports = router;
