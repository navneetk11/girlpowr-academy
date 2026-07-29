const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  programType: { type: String, enum: ['Training', 'T&T', 'Online', 'GirlPowR'], required: true },
  description: { type: String },
  cities:      [{ type: String, required: true }],
  requiresAudition: { type: Boolean, default: false },
  capacity:    { type: Number, default: null },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);