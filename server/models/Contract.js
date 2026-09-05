const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  studentId:            { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, unique: true },
  rulesSignedAt:         { type: Date, default: null },
  mediaReleaseSignedAt:  { type: Date, default: null },
  contractSignedAt:      { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
