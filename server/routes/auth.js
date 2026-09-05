const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Notification = require('../models/Notification');

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  const { fullName, email, password, role, phone, dateOfBirth, program, city } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      passwordHash,
      role: role || 'student',
      phone,
      dateOfBirth,
      isApproved: false,
    });

    // Create linked Student profile if role is student
    if (user.role === 'student') {
      await Student.create({
        fullName: user.fullName,
        dateOfBirth: user.dateOfBirth,
        userId: user._id,
        program: program || '',
        city: city || '',
      });
    }

    await Notification.create({
      type: 'new_registration',
      message: `New student registered: ${fullName}`,
      relatedUser: user._id,
    });

    res.status(201).json({
      message: 'Registration successful! Waiting for admin approval.',
      userId: user._id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!user.isApproved) {
      return res.status(403).json({ message: 'Your account is pending admin approval.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Find the linked Student profile
    const student = await Student.findOne({ userId: user._id });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      studentId: student ? student._id : null,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;