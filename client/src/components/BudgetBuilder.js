import React, { useState, useEffect } from 'react';
import './BudgetBuilder.css';

const BudgetBuilder = ({ budget, onUpdateBudget }) => {
  const [totalBudget, setTotalBudget] = useState(budget.totalBudget?.toString() || '');
  const [categories, setCategories] = useState({
    investments: budget.categories?.investments?.toString() || '',
    food: budget.categories?.food?.toString() || '',
    rent: budget.categories?.rent?.toString() || '',
    others: budget.categories?.others?.toString() || ''
  });

  // Update state when budget prop changes
  useEffect(() => {
    setTotalBudget(budget.totalBudget?.toString() || '');
    setCategories({
      investments: budget.categories?.investments?.toString() || '',
      food: budget.categories?.food?.toString() || '',
      rent: budget.categories?.rent?.toString() || '',
      others: budget.categories?.others?.toString() || ''
    });
  }, [budget]);

  const handleCategoryChange = (category, value) => {
    setCategories({
      ...categories,
      [category]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Round to 2 decimal places to avoid floating point errors
    const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
    
    onUpdateBudget({ 
      totalBudget: roundTo2(parseFloat(totalBudget) || 0), 
      categories: {
        investments: roundTo2(parseFloat(categories.investments) || 0),
        food: roundTo2(parseFloat(categories.food) || 0),
        rent: roundTo2(parseFloat(categories.rent) || 0),
        others: roundTo2(parseFloat(categories.others) || 0)
      }
    });
  };

  const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
  const totalAllocated = Object.values(categories).reduce((sum, val) => roundTo2(sum + (parseFloat(val) || 0)), 0);
  const remainingToAllocate = roundTo2((parseFloat(totalBudget) || 0) - totalAllocated);

  return (
    <div className="budget-builder">
      <h2>💰 Budget Builder</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Total Budget</label>
          <input
            type="number"
            step="0.01"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            placeholder="Enter total budget"
            required
          />
        </div>

        <div className="categories-section">
          <h3>Allocate Budget by Category</h3>
          
          <div className="form-group">
            <label>💼 Investments</label>
            <input
              type="number"
              step="0.01"
              value={categories.investments}
              onChange={(e) => handleCategoryChange('investments', e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>🍕 Food</label>
            <input
              type="number"
              step="0.01"
              value={categories.food}
              onChange={(e) => handleCategoryChange('food', e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>🏠 Rent</label>
            <input
              type="number"
              step="0.01"
              value={categories.rent}
              onChange={(e) => handleCategoryChange('rent', e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>📦 Others</label>
            <input
              type="number"
              step="0.01"
              value={categories.others}
              onChange={(e) => handleCategoryChange('others', e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className={`allocation-status ${remainingToAllocate < 0 ? 'over-allocated' : ''}`}>
          <span>Remaining to allocate: ${remainingToAllocate.toFixed(2)}</span>
        </div>

        <button type="submit" className="submit-btn">
          Save Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetBuilder;
