const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passport = require("../config/passport");
const authMiddleware = require("../middleware/auth");

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" },
  );
};

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
      authMethod: "local",
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user registered with Google
    if (user.authMethod === "google") {
      return res.status(400).json({
        message: "This account uses Google Sign-In. Please login with Google.",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

// In routes/authRoutes.js

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user) {
      // If error, send back to login page
      return res.redirect(
        `${process.env.CLIENT_URL || "https://budget-tracker-bhvh.vercel.app"}/login?error=google_auth_failed`,
      );
    }

    // Success logic
    const token = generateToken(user);

    // Explicitly define the frontend URL with a fallback
    const frontendURL =
      process.env.CLIENT_URL || "https://budget-tracker-bhvh.vercel.app";

    // Ensure there are no trailing slashes causing double // in the URL
    const cleanURL = frontendURL.endsWith("/")
      ? frontendURL.slice(0, -1)
      : frontendURL;

    const redirectUrl = `${cleanURL}/auth/success?token=${token}`;

    console.log("✅ Success! Redirecting to:", redirectUrl);
    res.redirect(redirectUrl);
  })(req, res, next);
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", authMiddleware, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
