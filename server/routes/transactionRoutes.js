const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all user's transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new transaction
router.post('/', async (req, res) => {
  try {
    // Helper function to round to 2 decimal places
    const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
    
    const transactionData = {
      ...req.body,
      userId: req.user.userId,
      amount: roundTo2(req.body.amount)
    };
    
    const transaction = new Transaction(transactionData);
    const newTransaction = await transaction.save();
    
    // Update budget categories
    const budget = await Budget.findOne({ userId: req.user.userId });
    if (budget) {
      if (transaction.type === 'expense') {
        budget.categories[transaction.category] = roundTo2(
          budget.categories[transaction.category] + transaction.amount
        );
      } else {
        budget.categories[transaction.category] = roundTo2(
          budget.categories[transaction.category] - transaction.amount
        );
      }
      budget.updatedAt = Date.now();
      await budget.save();
    }
    
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    // Helper function to round to 2 decimal places
    const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
    
    const transaction = await Transaction.findOne({ 
      _id: req.params.id,
      userId: req.user.userId 
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Update budget categories
    const budget = await Budget.findOne({ userId: req.user.userId });
    if (budget) {
      if (transaction.type === 'expense') {
        budget.categories[transaction.category] = roundTo2(
          budget.categories[transaction.category] - transaction.amount
        );
      } else {
        budget.categories[transaction.category] = roundTo2(
          budget.categories[transaction.category] + transaction.amount
        );
      }
      budget.updatedAt = Date.now();
      await budget.save();
    }
    
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
