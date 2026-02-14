import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import useAuth
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthSuccess from "./components/AuthSuccess";
import Dashboard from "./components/Dashboard";

// A small wrapper to handle the conditional logic
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  // 1. Prevent "Flash of Login Page" while checking for existing token
  if (loading) {
    return (
      <div className="loading-screen-global">
        <div className="spinner"></div>
        <p>Verifying Session...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* 2. Public Routes: Redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />

      {/* 3. Auth Callback Route */}
      <Route path="/auth/success" element={<AuthSuccess />} />

      {/* 4. Private Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 5. Default Route */}
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
