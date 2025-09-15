const express = require('express');
const auth = require('../middleware/auth');
const Question = require('../models/Question');
const Result = require('../models/Result');
const router = express.Router();

// Submit answers (protected)
router.post('/submit', auth, async (req, res) => {
  try {
    const { quizId, answers } = req.body; // answers: [{ questionId, chosenIndex }]
    const questions = await Question.find({ quizId });
    const total = questions.length;
    const map = {};
    questions.forEach(q => { map[q._id.toString()] = q; });
    let correct = 0;
    answers.forEach(a => {
      const q = map[a.questionId];
      if (!q) return;
      if (q.correctAnswerIndex === a.chosenIndex) correct++;
    });
    const percent = Math.round((correct / total) * 100);
    const passed = percent >= 50; // pass threshold
    const result = await Result.create({
      userId: req.userId,
      quizId,
      score: percent,
      total,
      passed
    });
    res.json({ score: percent, total, passed, resultId: result._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leaderboard for a quiz (public)
router.get('/leaderboard/:quizId', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const results = await Result.find({ quizId })
      .populate('userId', 'name email')
      .sort({ score: -1, date: 1 });
    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
