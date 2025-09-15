const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);
