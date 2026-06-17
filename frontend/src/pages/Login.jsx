import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Email and password required");
        return;
      }

      const res = await loginUser({ email, password });
      const data = res?.data;

      if (data?.error) {
        setError(data.error);
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/chat");

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left">
        <h1>DevPilot</h1>
        <p>AI-powered coding assistant</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">

          <h2>Welcome Back</h2>

          {error && <div className="error">{error}</div>}

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

          <button onClick={handleLogin}>
            Login
          </button>

          <div className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </div>

        </div>
      </div>

    </div>
  );
}