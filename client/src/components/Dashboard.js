import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CircularProgress from "./CircularProgress";
import BudgetBuilder from "./BudgetBuilder";
import TransactionTracker from "./TransactionTracker";
import "../App.css";
import "./Dashboard.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [budget, setBudget] = useState({
    totalBudget: 0,
    categories: {
      investments: 0,
      food: 0,
      rent: 0,
      others: 0,
    },
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudget();
    fetchTransactions();
  }, []);

  const fetchBudget = async () => {
    try {
      const response = await axios.get(`${API_URL}/budget`);
      setBudget(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching budget:", error);
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleUpdateBudget = async (updatedBudget) => {
    try {
      const response = await axios.put(`${API_URL}/budget`, updatedBudget);
      setBudget(response.data);
      alert("Budget updated successfully! 🎉");
    } catch (error) {
      console.error("Error updating budget:", error);
      alert("Failed to update budget. Please try again.");
    }
  };

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await axios.post(`${API_URL}/transactions`, transaction);
      setTransactions([response.data, ...transactions]);
      fetchBudget(); // Refresh budget to update spent amounts
      alert("Transaction added successfully! ✅");
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Please try again.");
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`${API_URL}/transactions/${id}`);
        setTransactions(transactions.filter((t) => t._id !== id));
        fetchBudget(); // Refresh budget to update spent amounts
        alert("Transaction deleted successfully! 🗑️");
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete transaction. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Helper function to round to 2 decimal places
  const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
  const totalSpent = roundTo2(
    Object.values(budget.categories).reduce((sum, val) => sum + val, 0),
  );

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>💸 Budget Tracker</h1>
            <p className="tagline">Take control of your finances</p>
          </div>
          <div className="user-info">
            <div className="avatar-container">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="user-avatar"
                  referrerPolicy="no-referrer" // 👈 CRITICAL: Prevents Google from blocking the image
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none"; // Hides broken image and shows initial
                  }}
                />
              ) : (
                <div className="avatar-initial">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>

            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-email">{user?.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="progress-section">
          <CircularProgress
            total={budget.totalBudget}
            spent={totalSpent}
            size={250}
          />
          <div className="budget-summary">
            <div className="summary-item">
              <span className="summary-label">Total Budget:</span>
              <span className="summary-value">
                ${budget.totalBudget.toFixed(2)}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Spent:</span>
              <span className="summary-value spent">
                ${totalSpent.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="category-breakdown">
            <h3>Category Breakdown</h3>
            {Object.entries(budget.categories).map(([category, amount]) => (
              <div key={category} className="category-item">
                <span className="category-name">
                  {category === "investments" && "💼"}
                  {category === "food" && "🍕"}
                  {category === "rent" && "🏠"}
                  {category === "others" && "📦"}{" "}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <span className="category-amount">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="builder-section">
          <BudgetBuilder budget={budget} onUpdateBudget={handleUpdateBudget} />
        </div>
      </div>

      <div className="tracker-section">
        <TransactionTracker
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>

      <footer className="app-footer">
        <p>Built with ❤️ using MERN Stack</p>
      </footer>
    </div>
  );
}

export default Dashboard;
