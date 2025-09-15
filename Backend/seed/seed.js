const mongoose = require("mongoose");
const Question = require("../models/Question");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const questions = [
  {
    quizId: "intro-js",
    questionText: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Google", "Oracle"],
    correctAnswerIndex: 0
  },
  {
    quizId: "intro-js",
    questionText: "Which symbol is used for assignment in JavaScript?",
    options: ["==", "=", "===", ":"],
    correctAnswerIndex: 1
  },
  {
    quizId: "intro-js",
    questionText: "Which is not a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    correctAnswerIndex: 3
  }
];

async function seed() {
  try {
    await Question.deleteMany({ quizId: "intro-js" });
    await Question.insertMany(questions);
    console.log("✅ Questions seeded");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding questions:", err);
  }
}

seed();
