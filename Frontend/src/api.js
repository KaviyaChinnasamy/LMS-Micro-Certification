const API = "http://localhost:5000/api"; // backend URL

export async function register(name, email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function fetchQuiz(quizId) {
  const res = await fetch(`${API}/quiz/${quizId}`);
  return res.json();
}

export async function submitQuiz(token, quizId, answers) {
  const res = await fetch(`${API}/result/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ quizId, answers })
  });
  return res.json();
}

export async function fetchLeaderboard(quizId) {
  const res = await fetch(`${API}/result/leaderboard/${quizId}`);
  return res.json();
}

export async function downloadCertificate(token, resultId) {
  const res = await fetch(`${API}/cert/download/${resultId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to download");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `certificate_${resultId}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
}
