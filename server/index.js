// The order in which these middleware / files are required is important!
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./models/ParkingSpot");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();
app.use(helmet());

// Wire up the body-parser middleware to handle incoming HTTP requests.
app.use(bodyParser.json());

// Enable cookies in Express.
app.use(
  cookieSession({
    // How long this cookie can exist in the browser before it is expired.
    // 30 days, 24 h/day, 60 mins/hour, 60 sec/min, 1000 ms/sec.
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] // Used to sign/encrypt the cookie.
  })
);

// Initialize Passport and use persistent login sessions.
app.use(passport.initialize());
app.use(passport.session());

// Since require returns a function, and this file we're importing takes
// one argument, we immediately invoke this function passing the app object.
require("./routes/authRoutes")(app);
require("./routes/spotRoutes")(app);
require("./routes/billingRoutes")(app);

// This code is only run in production. Order of operations matters!
// NODE_ENV is automatically set by the hosting service (i.e. Heroku).
// The idea is that some requests can be answered by the Express server,
// some that are looking for specific files in the client/build dir,
// and others that can be answered by the index.html file because React Router
// knows what to do with them.
if (process.env.NODE_ENV === "production") {
  // Any GET request that comes in for some route or file we're not handling,
  // try to find the asset inside the client/build dir (i.e. main.js, main.css)
  // that the React server bundles.
  app.use(express.static("client/build"));

  // If Express finds no match for a request in the route handlers, or in the
  // above step, then serve the index.html file insde of client/build.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
