const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // CRITICAL: Ensure this EXACT URL is in your Google Cloud Console
      callbackURL: "http://localhost:5001/api/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(
          "🔍 Passport Strategy: Received profile from Google:",
          profile.emails[0].value,
        );

        // 1. Check if user already exists by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log("✅ Existing Google user found.");
          return done(null, user);
        }

        // 2. Check if email exists (registered via local login)
        const email = profile.emails[0].value;
        user = await User.findOne({ email });

        if (user) {
          console.log("🔗 Linking Google ID to existing email account.");
          user.googleId = profile.id;
          user.profilePicture = profile.photos[0]?.value || "";
          await user.save();
          return done(null, user);
        }

        // 3. Create new user
        console.log("🆕 Creating new user from Google profile.");
        user = await User.create({
          googleId: profile.id,
          email: email,
          name: profile.displayName,
          profilePicture: profile.photos[0]?.value || "",
          authMethod: "google",
          // If your User model requires a password field,
          // you might need to provide a dummy one or make the field optional.
        });

        return done(null, user);
      } catch (error) {
        console.error("❌ Error in Google Strategy Callback:", error);
        return done(error, null);
      }
    },
  ),
);

module.exports = passport;
