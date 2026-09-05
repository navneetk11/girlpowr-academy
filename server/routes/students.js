const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { protect } = require('../middleware/authMiddleware');

// POST /api/students
router.post('/', protect, async (req, res) => {
  try {
    const { fullName, dateOfBirth, userId, guardianId } = req.body;

    const student = await Student.create({
      fullName,
      dateOfBirth,
      userId,
      guardianId: guardianId || null,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/students/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/students/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const { dateOfBirth, photo, guardianId } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { dateOfBirth, photo, guardianId },
      { new: true, runValidators: true }
    );

    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;