import React, { useState } from "react";
import { login, register } from "../api";

function Auth({ onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    let data;
    if (isLogin) {
      data = await login(email, password);
    } else {
      data = await register(name, email, password);
    }
    if (data.token) {
      onSuccess(data.token, data.user);
    } else {
      alert(data.message || "Auth failed");
    }
  }

  return (
    <div className="card">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {!isLogin && (
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>
      <p>
        {isLogin ? "No account?" : "Have an account?"}{" "}
        <span className="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Auth;
