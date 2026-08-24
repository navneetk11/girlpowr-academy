const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /api/admin/notifications
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ isRead: false }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;