const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  program:   { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  city:      { type: String, required: true },
  status:    { type: String, enum: ['pending', 'active', 'waitlisted', 'dropped'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);