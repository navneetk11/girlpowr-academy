const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// POST /api/enrollments
router.post('/', async (req, res) => {
  try {
    const { student, program, city } = req.body;
    const enrollment = await Enrollment.create({ student, program, city });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/enrollments/:studentId
router.get('/:studentId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.studentId }).populate('program');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/enrollments/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;