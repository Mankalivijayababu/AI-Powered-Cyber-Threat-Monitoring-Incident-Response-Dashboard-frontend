import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SecurityBackground from "../components/SecurityBackground";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const token = await login(email, password);

      // store token
      localStorage.setItem("token", token);
      localStorage.setItem("tokenTime", Date.now());

      navigate("/dashboard");

    } catch (err) {

      setError("Invalid email or password");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <SecurityBackground />

      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleLogin}>

          <h2 className="login-title">🔐 Cyber Threat Intelligence</h2>

          <p className="login-subtitle">
            Secure access to monitoring dashboard
          </p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

          <div className="login-footer">
            <span>Protected by Firebase Auth</span>
          </div>

        </form>
      </div>
    </>
  );
}