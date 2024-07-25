// ===================================================================
// Packages
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
// ===================================================================

// ===================================================================
const userRoute = require("./auth/user"); // user routes
const authRoute = require("./auth/auth"); // auth routes
// ===================================================================

// ===================================================================
require("./auth/passportGithubSSO"); // GitHub strategy configuration

const app = express();
const PORT = process.env.PORT || 3000;

const website = "http://localhost:5173";

// CORS
app.use(
  cors({
    origin: website,
    credentials: true,
  })
);

// Express session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Initializing Passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());
// ===================================================================

// ===================================================================
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
// ===================================================================

// ===================================================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// ===================================================================
