import React, { useState, useEffect, useRef } from "react";
import "./BudgetBuilder.css";

const BudgetBuilder = ({ budget, onUpdateBudget }) => {
  const initialized = useRef(false);

  const [totalBudget, setTotalBudget] = useState("");
  const [categories, setCategories] = useState({
    investments: "",
    food: "",
    rent: "",
    others: "",
  });

  // Only sync from props once — when real data first arrives from the API
  useEffect(() => {
    if (initialized.current) return;

    const hasData =
      budget.totalBudget > 0 ||
      Object.values(budget.categories || {}).some((v) => v > 0);

    if (!hasData) return;

    initialized.current = true;

    setTotalBudget(budget.totalBudget > 0 ? String(budget.totalBudget) : "");
    setCategories({
      investments:
        budget.categories?.investments > 0
          ? String(budget.categories.investments)
          : "",
      food: budget.categories?.food > 0 ? String(budget.categories.food) : "",
      rent: budget.categories?.rent > 0 ? String(budget.categories.rent) : "",
      others:
        budget.categories?.others > 0 ? String(budget.categories.others) : "",
    });
  }, [budget]);

  // Only allow digits and a single decimal point
  const sanitize = (value) =>
    value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

  const handleCategoryChange = (category, value) => {
    setCategories({ ...categories, [category]: sanitize(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

    onUpdateBudget({
      totalBudget: roundTo2(parseFloat(totalBudget) || 0),
      categories: {
        investments: roundTo2(parseFloat(categories.investments) || 0),
        food: roundTo2(parseFloat(categories.food) || 0),
        rent: roundTo2(parseFloat(categories.rent) || 0),
        others: roundTo2(parseFloat(categories.others) || 0),
      },
    });
  };

  const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
  const totalAllocated = Object.values(categories).reduce(
    (sum, val) => roundTo2(sum + (parseFloat(val) || 0)),
    0,
  );
  const remainingToAllocate = roundTo2(
    (parseFloat(totalBudget) || 0) - totalAllocated,
  );

  return (
    <div className="budget-builder">
      <h2>💰 Budget Builder</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Total Budget</label>
          <input
            type="text"
            inputMode="decimal"
            value={totalBudget}
            onChange={(e) => setTotalBudget(sanitize(e.target.value))}
            placeholder="Enter total budget"
            required
          />
        </div>

        <div className="categories-section">
          <h3>Allocate Budget by Category</h3>

          <div className="form-group">
            <label>💼 Investments</label>
            <input
              type="text"
              inputMode="decimal"
              value={categories.investments}
              onChange={(e) =>
                handleCategoryChange("investments", e.target.value)
              }
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>🍕 Food</label>
            <input
              type="text"
              inputMode="decimal"
              value={categories.food}
              onChange={(e) => handleCategoryChange("food", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>🏠 Rent</label>
            <input
              type="text"
              inputMode="decimal"
              value={categories.rent}
              onChange={(e) => handleCategoryChange("rent", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>📦 Others</label>
            <input
              type="text"
              inputMode="decimal"
              value={categories.others}
              onChange={(e) => handleCategoryChange("others", e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <div
          className={`allocation-status ${remainingToAllocate < 0 ? "over-allocated" : ""}`}
        >
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
