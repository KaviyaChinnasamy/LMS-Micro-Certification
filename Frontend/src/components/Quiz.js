import React, { useState, useEffect } from "react";
import { fetchQuiz, submitQuiz } from "../api";

function Quiz({ token, quizId, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuiz(quizId).then((data) => setQuestions(data.questions || []));
  }, [quizId]);

  function chooseAnswer(qId, idx) {
    setAnswers({ ...answers, [qId]: idx });
  }

  async function handleSubmit() {
    const payload = Object.entries(answers).map(([questionId, chosenIndex]) => ({
      questionId,
      chosenIndex
    }));
    const data = await submitQuiz(token, quizId, payload);
    if (data.resultId) {
      onFinish(data);
    } else {
      alert("Submit failed");
    }
  }

  if (!questions.length) return <p>Loading quiz...</p>;
  const q = questions[qIndex];

  return (
    <div className="card">
      <h2>
        Question {qIndex + 1} / {questions.length}
      </h2>
      <p>{q.questionText}</p>
      {q.options.map((opt, idx) => (
        <label key={idx}>
          <input
            type="radio"
            name="opt"
            checked={answers[q._id] === idx}
            onChange={() => chooseAnswer(q._id, idx)}
          />{" "}
          {opt}
        </label>
      ))}
      <div className="nav-buttons">
        <button disabled={qIndex === 0} onClick={() => setQIndex(qIndex - 1)}>
          Previous
        </button>
        <button
          disabled={qIndex === questions.length - 1}
          onClick={() => setQIndex(qIndex + 1)}
        >
          Next
        </button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Quiz;
