const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
  quizId: { type: String, required:true },
  score: { type: Number, required:true }, // percentage
  total: { type: Number, required:true },
  passed: { type: Boolean, required:true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
