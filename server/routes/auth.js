const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  const { fullName, email, password, role, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user with pending status
    const user = await User.create({
      fullName,
      email,
      passwordHash,
      role: role || 'student',
      phone,
      isApproved: false,
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
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if approved
    if (!user.isApproved) {
      return res.status(403).json({ message: 'Your account is pending admin approval.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;