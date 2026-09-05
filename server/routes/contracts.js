const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const { protect } = require('../middleware/authMiddleware');

const isAllSigned = (contract) =>
  !!(contract && contract.rulesSignedAt && contract.mediaReleaseSignedAt && contract.contractSignedAt);

// POST /api/contracts
router.post('/', protect, async (req, res) => {
  try {
    const { studentId, rules, mediaRelease, contract } = req.body;
    if (!studentId) {
      return res.status(400).json({ message: 'studentId is required' });
    }

    const now = new Date();
    const update = {};
    if (rules) update.rulesSignedAt = now;
    if (mediaRelease) update.mediaReleaseSignedAt = now;
    if (contract) update.contractSignedAt = now;

    const saved = await Contract.findOneAndUpdate(
      { studentId },
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ ...saved.toObject(), allSigned: isAllSigned(saved) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contracts/:studentId
router.get('/:studentId', protect, async (req, res) => {
  try {
    const contract = await Contract.findOne({ studentId: req.params.studentId });
    if (!contract) {
      return res.json({ studentId: req.params.studentId, allSigned: false });
    }
    res.json({ ...contract.toObject(), allSigned: isAllSigned(contract) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
