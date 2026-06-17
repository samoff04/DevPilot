import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) return;

      await registerUser({ name, email, password });

      navigate("/login");

    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left">
        <h1>DevPilot</h1>
        <p>Join AI-powered coding experience</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">

          <h2>Create Account</h2>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button onClick={handleRegister}>
            Register
          </button>

          <div className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </div>

        </div>
      </div>

    </div>
  );
}