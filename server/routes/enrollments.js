const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Notification = require('../models/Notification');

// POST /api/enrollments
router.post('/', async (req, res) => {
  try {
    const { student, program, city } = req.body;
    const enrollment = await Enrollment.create({ student, program, city });

    await Notification.create({
      type: 'new_registration',
      message: `New enrollment request for program ${program}`,
      relatedUser: student,
    });

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

// PUT /api/enrollments/:id
router.put('/:id', async (req, res) => {
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