const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update attendance
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete student
router.delete("/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;