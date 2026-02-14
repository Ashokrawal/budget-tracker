# 🚀 QUICKSTART GUIDE

Get your Budget Tracker app running in 5 minutes!

## Step 1: Install MongoDB (if not already installed)

### Option A: Local MongoDB
Download and install from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

### Option B: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

## Step 2: Setup Backend

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/budget-tracker" > .env
echo "PORT=5000" >> .env

# If using MongoDB Atlas, use your connection string instead:
# echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/budget-tracker" > .env

# Start the server
npm start
```

✅ You should see: "MongoDB connected successfully" and "Server is running on port 5000"

## Step 3: Setup Frontend

```bash
# Open a NEW terminal window
# Navigate to client folder
cd client

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the React app
npm start
```

✅ Your browser should automatically open to `http://localhost:3000`

## Step 4: Start Using the App!

1. **Set Your Budget**: Enter $2000 as total budget
2. **Allocate Categories**: 
   - Investments: $500
   - Food: $600
   - Rent: $800
   - Others: $100
3. **Click "Save Budget"**
4. **Add a Transaction**: 
   - Description: "Grocery shopping"
   - Amount: $40
   - Category: Food
   - Type: Expense
5. **Watch the circle change!** 🎉

## 🎯 What You Should See

- A beautiful purple gradient background
- A green circular progress indicator showing 98% (since you spent $40 of $2000)
- Your transaction listed in the tracker
- Category breakdown showing $40 spent on Food

## ⚠️ Troubleshooting

**Server won't start?**
- Make sure MongoDB is running
- Check if port 5000 is available
- Verify your .env file has the correct MONGODB_URI

**React app won't start?**
- Make sure the backend is running first
- Check if port 3000 is available
- Clear npm cache: `npm cache clean --force`

**Can't connect to database?**
- If using local MongoDB, make sure MongoDB service is running
- If using Atlas, check your connection string and network access settings

## 📱 Test the App

Try these scenarios:
1. Add multiple transactions and watch the circle color change
2. Try adding an expense that goes over budget (circle will turn red)
3. Delete a transaction and see the circle update
4. Update your budget allocation

## 🎨 Color Guide

- 🟢 Green (70-100%): Healthy budget
- 🟠 Orange (40-69%): Monitor spending
- 🔴 Red (0-39%): Budget alert!

---

Need help? Check the full README.md for detailed documentation.
