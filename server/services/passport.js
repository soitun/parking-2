const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Gets access to the User model class. One argument in model() to pull
// the model out of Mongoose.
const User = mongoose.model("users");

// The profile.id in the strategy only matters for the auth flow.
// Once the user is logged in, we only care about the id in our db.
// So, take the user model that was passed to the done() callback in the
// strategy, and give it a unique token that will be used on any follow-up
// requests to the server. serializeUser() is automatically called by Passport
// upon login.
passport.serializeUser((user, done) => {
  // user.id represents the unique record id in the users collection.
  // This is a shortcut, no need to reach for _id etc.
  // Now this id is the token stored in the cookie.
  done(null, user.id);
});

// On any follow-up requests from the user, the browser will include the
// cookie generated with serializeUser(), which we use now to turn it into
// a user.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Create new instance of GoogleStrategy passing an object with the keys,
// and the route to handle a user coming back from Google. The callback
// function gets executed only when the code is exchanged for the user profile.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true // Used for Heroku, since requests are routed thru a proxy.
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // 1st argument of error or null, 2nd is this actual db record.
        return done(null, existingUser);
      }
      // Create a new model instance of User that represents a record in
      // the database.
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
