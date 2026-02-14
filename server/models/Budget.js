const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalBudget: {
    type: Number,
    required: true,
    default: 0
  },
  categories: {
    investments: {
      type: Number,
      default: 0
    },
    food: {
      type: Number,
      default: 0
    },
    rent: {
      type: Number,
      default: 0
    },
    others: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create unique index for userId
budgetSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);
