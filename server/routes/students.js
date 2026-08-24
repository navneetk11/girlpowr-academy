const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-passwordHash');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, phone },
      { new: true, runValidators: true }
    ).select('-passwordHash');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;