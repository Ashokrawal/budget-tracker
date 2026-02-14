import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    try {
      const token = searchParams.get("token");
      console.log("1. Token extracted from URL:", token ? "YES" : "NO");

      if (token) {
        // Save to localStorage immediately as a backup
        localStorage.setItem("token", token);
        console.log("2. Token saved to localStorage");

        // Update context state
        if (setToken) {
          setToken(token);
          console.log("3. Context state updated");
        }

        // Move to dashboard
        console.log("4. Navigating to dashboard...");
        navigate("/dashboard", { replace: true });
      } else {
        console.error("No token found in URL");
        navigate("/login");
      }
    } catch (err) {
      console.error("AuthSuccess Component Error:", err);
    }
  }, [searchParams, navigate, setToken]);
  return (
    <div className="auth-container">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "40px" }}>💸</h1>
        <h2>Authenticating...</h2>
        <p className="auth-subtitle">Finalizing your secure session</p>

        {/* Simple professional CSS spinner */}
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default AuthSuccess;
