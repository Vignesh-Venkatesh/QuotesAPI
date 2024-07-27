// ===================================================================
// Packages
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
// ===================================================================

// ===================================================================
const authRoute = require("./auth/auth"); // auth routes
const quotesRoute = require("./Quotes/quotes"); // quotes routes
const authorsRoute = require("./Authors/authors"); // authors routes
// ===================================================================

// ===================================================================
const authMiddleware = require("./Middleware/apiAuth"); // Auth (API key valiation middleware)
const statHitMiddleWare = require("./Middleware/apiStat"); // API call tracking Middleware
// ===================================================================

// ===================================================================
require("./auth/passportGithubSSO"); // GitHub strategy configuration

const app = express();
const PORT = process.env.PORT || 3000;

const website = "http://localhost:5173";

// JSON
app.use(express.json());

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
app.use("/api/v1/auth", authRoute); // Auth Route
app.use("/api/v1/quotes", authMiddleware, statHitMiddleWare, quotesRoute); // Quotes Route
app.use("/api/v1/authors", authMiddleware, statHitMiddleWare, authorsRoute); // Authors Route
// ===================================================================

// ===================================================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// ===================================================================
