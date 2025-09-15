import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api";

function Leaderboard({ quizId, onBack }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchLeaderboard(quizId).then((data) => setRows(data.results || []));
  }, [quizId]);

  return (
    <div className="card">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Score</th><th>Status</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id}>
              <td>{r.userId?.name}</td>
              <td>{r.userId?.email}</td>
              <td>{r.score}%</td>
              <td>{r.passed ? "Passed" : "Failed"}</td>
              <td>{new Date(r.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default Leaderboard;
