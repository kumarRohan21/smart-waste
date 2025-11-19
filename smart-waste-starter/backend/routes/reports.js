const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const auth = require('../middleware/auth');

// Create report (civilian)
router.post('/', auth, async (req, res) => {
  try {
    const { photoUrl, lat, lng, address, wasteType, notes } = req.body;
    const binMap = { household:'blue', plastic:'red', glass:'red', bio:'green', mixed:'blue' };
    const suggestedBin = binMap[wasteType] || 'blue';
    const report = new Report({ reporter: req.user.id, photoUrl, lat, lng, address, wasteType, suggestedBin, notes });
    await report.save();
    res.status(201).json(report);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// List reports
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'civilian') {
      const reports = await Report.find({ reporter: req.user.id }).sort({ createdAt: -1 });
      return res.json(reports);
    }
    const reports = await Report.find().populate('reporter', 'name email').sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update status / assign (admin/municipality)
router.patch('/:id', auth, async (req, res) => {
  try {
    if (!['admin','municipality'].includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    const updates = req.body;
    const rep = await Report.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(rep);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
