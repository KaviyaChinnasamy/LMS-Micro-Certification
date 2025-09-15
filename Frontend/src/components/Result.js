import React from "react";
import { downloadCertificate } from "../api";

function Result({ result, token, onLeaderboard, onLogout }) {
  return (
    <div className="card">
      <h2>Result</h2>
      <p>Score: {result.score}%</p>
      <p>{result.passed ? "Passed 🎉" : "Failed ❌"}</p>
      <button onClick={() => downloadCertificate(token, result.resultId)}>
        Download Certificate
      </button>
      <button onClick={onLeaderboard}>View Leaderboard</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Result;
