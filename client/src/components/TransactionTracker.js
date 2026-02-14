import React, { useState } from 'react';
import './TransactionTracker.css';

const TransactionTracker = ({ transactions, onAddTransaction, onDeleteTransaction }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'food',
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setFormData({
      description: '',
      amount: '',
      category: 'food',
      type: 'expense'
    });
    setShowForm(false);
  };

  const categoryIcons = {
    investments: '💼',
    food: '🍕',
    rent: '🏠',
    others: '📦'
  };

  return (
    <div className="transaction-tracker">
      <div className="tracker-header">
        <h2>📊 Transaction Tracker</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Transaction'}
        </button>
      </div>

      {showForm && (
        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Grocery shopping"
                required
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="investments">💼 Investments</option>
                <option value="food">🍕 Food</option>
                <option value="rent">🏠 Rent</option>
                <option value="others">📦 Others</option>
              </select>
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">Add Transaction</button>
        </form>
      )}

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions yet. Add your first transaction!</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-info">
                <span className="transaction-icon">{categoryIcons[transaction.category]}</span>
                <div className="transaction-details">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-meta">
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="transaction-right">
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteTransaction(transaction._id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionTracker;
