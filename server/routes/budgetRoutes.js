const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get current user's budget
router.get('/', async (req, res) => {
  try {
    let budget = await Budget.findOne({ userId: req.user.userId });
    if (!budget) {
      budget = new Budget({
        userId: req.user.userId,
        totalBudget: 0,
        categories: {
          investments: 0,
          food: 0,
          rent: 0,
          others: 0
        }
      });
      await budget.save();
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user's budget
router.put('/', async (req, res) => {
  try {
    const { totalBudget, categories } = req.body;
    
    // Helper function to round to 2 decimal places
    const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
    
    let budget = await Budget.findOne({ userId: req.user.userId });
    
    if (!budget) {
      budget = new Budget({ 
        userId: req.user.userId,
        totalBudget: roundTo2(totalBudget), 
        categories: {
          investments: roundTo2(categories.investments || 0),
          food: roundTo2(categories.food || 0),
          rent: roundTo2(categories.rent || 0),
          others: roundTo2(categories.others || 0)
        }
      });
    } else {
      if (totalBudget !== undefined) budget.totalBudget = roundTo2(totalBudget);
      if (categories) {
        budget.categories = {
          investments: roundTo2(categories.investments || 0),
          food: roundTo2(categories.food || 0),
          rent: roundTo2(categories.rent || 0),
          others: roundTo2(categories.others || 0)
        };
      }
      budget.updatedAt = Date.now();
    }
    
    await budget.save();
    res.json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
