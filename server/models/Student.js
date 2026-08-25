const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName:      { type: String, required: true },
  dateOfBirth:   { type: Date, required: true },
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  guardianId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  level:         { type: String, default: 'Beginner' },
  auditionStatus:{ type: String, enum: ['not_applicable', 'pending', 'accepted', 'rejected'], default: 'not_applicable' },
  photo:         { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);