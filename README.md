# 💸 Budget Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing personal finances with an intuitive circular progress indicator that visualizes your budget in real-time.

## ✨ Features

### 💰 Budget Builder
- Set your total budget amount
- Allocate budget across four categories:
  - 💼 Investments
  - 🍕 Food
  - 🏠 Rent
  - 📦 Others
- Real-time validation to prevent over-allocation

### 📊 Transaction Tracker
- Add income and expense transactions
- Categorize transactions for better tracking
- View transaction history with details
- Delete transactions with automatic budget recalculation
- Beautiful, responsive UI with emoji indicators

### 🎯 Circular Progress Indicator
- Visual representation of remaining budget
- Dynamic color coding:
  - 🟢 Green (70-100%): You're doing great!
  - 🟠 Orange (40-69%): Watch your spending
  - 🔴 Red (0-39%): Running low on budget
- Real-time updates as you add/remove transactions
- Percentage and dollar amount display

## 🛠️ Technology Stack

**Frontend:**
- React.js
- Axios for API calls
- CSS3 with gradient backgrounds and animations

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS enabled

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd budget-tracker-app
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/budget-tracker
# or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/budget-tracker

# Start the server
npm start
# For development with auto-reload:
npm run dev
```

The server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The default API URL is already set to http://localhost:5000/api
# Edit .env if your backend runs on a different port

# Start the React development server
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
budget-tracker-app/
├── client/                          # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BudgetBuilder.js    # Budget allocation component
│   │   │   ├── BudgetBuilder.css
│   │   │   ├── CircularProgress.js  # Circular progress indicator
│   │   │   ├── CircularProgress.css
│   │   │   ├── TransactionTracker.js
│   │   │   └── TransactionTracker.css
│   │   ├── App.js                   # Main component
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   └── package.json
├── server/                          # Node.js backend
│   ├── models/
│   │   ├── Budget.js               # Budget schema
│   │   └── Transaction.js          # Transaction schema
│   ├── routes/
│   │   ├── budgetRoutes.js         # Budget API endpoints
│   │   └── transactionRoutes.js    # Transaction API endpoints
│   ├── .env.example
│   ├── server.js                   # Express server
│   └── package.json
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Budget Endpoints
- `GET /api/budget` - Get current budget
- `PUT /api/budget` - Update budget

### Transaction Endpoints
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `DELETE /api/transactions/:id` - Delete transaction

## 💡 Usage

1. **Set Your Budget**
   - Enter your total budget amount
   - Allocate amounts to different categories
   - Click "Save Budget"

2. **Track Transactions**
   - Click "+ Add Transaction"
   - Fill in description, amount, category, and type
   - Submit to add to your transaction history
   - Watch the circular progress indicator update automatically!

3. **Monitor Your Spending**
   - The circular indicator shows your remaining budget
   - Green means you're on track
   - Red means you need to be careful with spending
   - View category breakdown to see where your money goes

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple-to-pink gradient inspired by modern UI design
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Color-Coded Feedback**: Visual cues help you understand your financial status at a glance
- **Clean Typography**: Easy-to-read fonts and proper spacing

## 🔒 Environment Variables

### Server (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚢 Deployment

### Backend (Vercel, Heroku, or Railway)
1. Set environment variables in your hosting platform
2. Deploy the `/server` directory
3. Note the deployed API URL

### Frontend (Vercel, Netlify)
1. Update `REACT_APP_API_URL` to your deployed backend URL
2. Deploy the `/client` directory

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by nutritional-insights circular progress design
- Built with modern MERN stack best practices
- Icons and emojis for better visual appeal

---

Made with ❤️ for better financial management
