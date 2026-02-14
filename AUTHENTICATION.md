# 🔐 Authentication Setup Guide

Your Budget Tracker now supports **two authentication methods**:
1. ✉️ Email/Password Registration
2. 🔑 Google OAuth Sign-In

## 🚀 Quick Start

### Option 1: Email/Password (Works Immediately)
No setup required! Just:
1. Start the server and client
2. Go to `/register`
3. Create an account with email and password
4. Login and start tracking!

### Option 2: Google OAuth (Requires Setup)

## 📋 Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "Budget Tracker"
4. Click "Create"

### Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: Budget Tracker
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue"
   - Skip "Scopes" → Click "Save and Continue"
   - Skip "Test users" → Click "Save and Continue"

4. Now create OAuth Client ID:
   - Application type: Web application
   - Name: Budget Tracker Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - Add your production URL later
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
     - Add your production callback URL later
   - Click "Create"

5. **Copy your credentials:**
   - Client ID (looks like: `123456789-abc...xyz.apps.googleusercontent.com`)
   - Client Secret (looks like: `GOCSPX-...`)

### Step 4: Configure Server Environment

1. Open `server/.env` file
2. Add your Google credentials:

```env
# MongoDB and basic config
MONGODB_URI=mongodb://localhost:27017/budget-tracker
PORT=5000
NODE_ENV=development

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-abc123xyz789

# Session Secret (generate another random string)
SESSION_SECRET=your-super-secret-session-key-change-this-in-production-def456uvw012

# Google OAuth Credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWx

# Client URL
CLIENT_URL=http://localhost:3000
```

### Step 5: Generate Strong Secrets

For JWT_SECRET and SESSION_SECRET, use strong random strings:

**Option 1 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option 2 - Online:**
Use a password generator to create 32+ character random strings

### Step 6: Test It!

1. Start your server: `cd server && npm start`
2. Start your client: `cd client && npm start`
3. Go to `http://localhost:3000/login`
4. Click "Continue with Google"
5. Sign in with your Google account
6. You're in! 🎉

## 🔒 Security Best Practices

### Production Setup

When deploying to production:

1. **Update OAuth URIs in Google Console:**
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Redirect URIs: `https://yourdomain.com/api/auth/google/callback`

2. **Secure Environment Variables:**
   - Use strong, unique secrets for JWT_SECRET and SESSION_SECRET
   - Never commit `.env` file to Git
   - Use environment variables in hosting platform (Vercel, Heroku, etc.)

3. **Enable HTTPS:**
   - Set `NODE_ENV=production`
   - Secure cookies will be enabled automatically

## 🎯 How It Works

### Email/Password Flow:
1. User registers with email/password
2. Password is hashed with bcrypt (10 salt rounds)
3. JWT token is generated and sent to client
4. Client stores token in localStorage
5. Token is sent with every API request

### Google OAuth Flow:
1. User clicks "Continue with Google"
2. Redirected to Google sign-in page
3. After successful sign-in, Google redirects back to your app
4. Server creates/links user account
5. JWT token is generated
6. User is redirected to dashboard with token

## 🔑 User Separation

Each user has their own:
- ✅ **Separate Budget** - Your budget is yours alone
- ✅ **Separate Transactions** - Only you can see your transactions
- ✅ **Complete Privacy** - No data sharing between users

Perfect for you and your girlfriend to each have your own budget tracker!

## 🐛 Troubleshooting

### "Google OAuth failed"
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env
- Verify redirect URI matches exactly in Google Console
- Make sure Google+ API is enabled

### "Token is not valid"
- Check JWT_SECRET is set in .env
- Clear localStorage in browser
- Try logging in again

### "User already exists"
- Email is already registered
- Try logging in instead
- Or use "Continue with Google" if you registered with Google

### Database Issues
- Make sure MongoDB is running
- Check MONGODB_URI in .env
- Verify you can connect to MongoDB

## 📱 Testing Multiple Users

To test multiple user accounts:

1. **Incognito/Private Window:**
   - Open an incognito window
   - Login as user 1 in normal window
   - Login as user 2 in incognito window
   - Both can use the app simultaneously!

2. **Different Browsers:**
   - Chrome for user 1
   - Firefox for user 2

3. **Different Google Accounts:**
   - Each person signs in with their own Google account
   - Completely separate data

## ✨ Features

- 🔐 Secure JWT authentication
- 🔑 Google OAuth integration
- 🔒 Password hashing with bcrypt
- 👥 Multi-user support
- 🎯 User-specific data isolation
- 🚀 Session management
- 📱 Works on all devices

---

Need help? Check the main README.md or create an issue!
