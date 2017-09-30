const passport = require("passport");

// Export a function that accepts one argument. In index.js it is immediately
// invoked (IIFE) receiving the app object, and the routes below are attached.
module.exports = app => {
  // Whenever a user goes to this route, kick them to the OAuth flow
  // which is managed entirely by Passport. GoogleStrategy is internally
  // identified as 'google', which is passed to authenticate() as 1st argument.
  // 2nd argument is the options object, in which the scope specifies to Google
  // we want to have access to the user's profile and email info.
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Pass the code obtained from authenticating to the Passport strategy.
  // We are not kicking the user back to the OAuth flow, just making a
  // follow-up request with the Google servers to exchange that code for the
  // actual user profile and email address. This triggers the callback function
  // in the GoogleStrategy instance. Once Passport is done, it passes the
  // request to the next handler in the chain (the arrow fn).
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // After deserializeUser(), the user model is available as req.user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
