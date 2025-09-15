const express = require('express');
const PDFDocument = require('pdfkit');
const auth = require('../middleware/auth');
const Result = require('../models/Result');
const User = require('../models/User');
const router = express.Router();

// Download certificate (protected)
router.get('/download/:resultId', auth, async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    if (!result) return res.status(404).json({ message: 'Result not found' });
    if (result.userId.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    const user = await User.findById(req.userId);

    res.setHeader('Content-disposition', `attachment; filename=certificate_${result._id}.pdf`);
    res.setHeader('Content-type', 'application/pdf');

    const doc = new PDFDocument({ size: 'A4' });
    doc.pipe(res);

    // Simple design
    doc.fontSize(26).text('Micro-Certification', { align: 'center' });
    doc.moveDown(1.2);
    doc.fontSize(16).text('Certificate of Completion', { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(20).text(user.name, { align: 'center', underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`has completed the quiz: ${result.quizId}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Score: ${result.score}% (${result.passed ? 'Passed' : 'Failed'})`, { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(12).text(`Date: ${result.date.toDateString()}`, { align: 'center' });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
