const express = require('express');
const router = express.Router();
const Program = require('../models/Program');

// GET /api/programs  or  /api/programs?city=Ajax
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    const filter = { isActive: true };
    if (city) {
      // Include programs matching the city, plus programs with no city restriction
      // (Girl Pow-R: audition-only, available everywhere; Online: no physical city)
      filter.$or = [
        { cities: city },
        { cities: { $size: 0 } },
      ];
    }

    const programs = await Program.find(filter);
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/programs/:id
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;