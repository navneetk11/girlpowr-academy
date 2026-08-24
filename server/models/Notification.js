const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type:      { type: String, enum: ['new_registration', 'enrollment_update'], required: true },
  message:   { type: String, required: true },
  relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isRead:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);