import React, { useState } from "react";
import Auth from "./components/Auth";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [stage, setStage] = useState("auth"); // auth | quiz | result | leaderboard
  const [result, setResult] = useState(null);
  const quizId = "intro-js";

  function handleAuth(t, u) {
    setToken(t);
    setUser(u);
    setStage("quiz");
  }

  function handleFinish(res) {
    setResult(res);
    setStage("result");
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
    setResult(null);
    setStage("auth");
  }

  return (
    <div className="container">
      {stage === "auth" && <Auth onSuccess={handleAuth} />}
      {stage === "quiz" && (
        <Quiz token={token} quizId={quizId} onFinish={handleFinish} />
      )}
      {stage === "result" && (
        <Result
          result={result}
          token={token}
          onLeaderboard={() => setStage("leaderboard")}
          onLogout={handleLogout}
        />
      )}
      {stage === "leaderboard" && (
        <Leaderboard quizId={quizId} onBack={() => setStage("result")} />
      )}
    </div>
  );
}

export default App;
