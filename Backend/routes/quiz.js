const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Get questions for a quiz (do NOT send correctAnswerIndex)
router.get('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quizId }).select('-correctAnswerIndex -__v');
    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
