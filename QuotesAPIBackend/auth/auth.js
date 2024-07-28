const express = require("express");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const dashboardLink = "http://localhost:5173/dashboard";

const db = require("../Database/db");
const { generateTimestamp } = require("../utils/dateUtils");
const {
  getUserAPIkey,
  insertUserAPIkey,
  updateUserAPIkey,
  getUserAPIUsage,
  deleteUser,
} = require("./queries");

// ===================================================================
// GitHub authentication route
// Initiates GitHub authentication with user:email scope
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback route
// Handles GitHub callback and redirects to the frontend dashboard on success
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(dashboardLink); // Redirect to the frontend dashboard
  }
);

// ===================================================================

// ===================================================================
// User information route
// Provides user information if authenticated
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user); // Send authenticated user data
  } else {
    res.status(401).json({ message: "Not authenticated" }); // Send unauthorized status
  }
});

// Logout route
// Logs out the user and clears the session
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" }); // Send error status if logout fails
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logged out successfully" }); // Send success status
  });
});

// ===================================================================

// ===================================================================
// Get API Key route with authentication check
// Provides an API key if the user is authenticated and authorized
router.get("/getAPIkey", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "Unauthorized", status: 401 }); // Send unauthorized status if not authenticated
  }

  const userID = req.query.userID;

  if (userID === undefined) {
    return res.status(400).send({ message: "Invalid User ID", status: 400 }); // Send bad request status if userID is missing
  }

  // Check if the userID matches the authenticated user's ID
  if (req.user.id !== userID) {
    return res.status(403).send({ message: "Forbidden", status: 403 }); // Send forbidden status if IDs do not match
  }

  const userAPIkey = await getUserAPIkey(userID);

  if (userAPIkey.status === 200) {
    res
      .status(200)
      .send({ message: "success", apiKey: userAPIkey.apiKey, status: 200 });
  }
  // If user does not exist
  else if (userAPIkey.status === 404) {
    const id = userID;
    const name = req.user._json.name;
    const timestamp = generateTimestamp();
    const apiKey = uuidv4(); // Generate a new API key

    const createUser = await insertUserAPIkey(id, name, timestamp, apiKey);

    if (createUser.status === 201) {
      res.status(200).send({ message: "success", apiKey: apiKey, status: 200 });
    } else {
      res.status(500).send({ message: "Internal Server Error", status: 500 });
    }
  } else {
    res.status(500).send({ message: "Internal Server Error", status: 500 });
  }
});

// ===================================================================

// ===================================================================
// Generate API Key route with authentication check
// Provides a new API key if the user is authenticated and authorized

router.patch("/getNewAPIkey", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "Unauthorized", status: 401 }); // Send unauthorized status if not authenticated
  }

  const userID = req.query.userID;

  if (userID === undefined) {
    return res.status(400).send({ message: "Invalid User ID", status: 400 }); // Send bad request status if userID is missing
  }

  // Check if the userID matches the authenticated user's ID
  if (req.user.id !== userID) {
    return res.status(403).send({ message: "Forbidden", status: 403 }); // Send forbidden status if IDs do not match
  }

  const userAPIkey = await getUserAPIkey(userID);

  // If user exists
  if (userAPIkey.status === 200) {
    const apiKey = uuidv4();
    const updateAPIkey = await updateUserAPIkey(userID, apiKey);

    if (updateAPIkey.status === 200) {
      res.status(200).send({ message: "success", apiKey: apiKey, status: 200 });
    } else {
      res.status(500).send({ message: "Internal Server Error", status: 500 });
    }
  }
  // If user does not exist
  else if (userAPIkey.status === 404) {
    res.status(404).send({ message: "User Does Not Exist", status: 404 });
  } else {
    res.status(500).send({ message: "Internal Server Error", status: 500 });
  }
});

// ===================================================================

// ===================================================================
// Get API usage stats of user
router.get("/getAPIUsageStats", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "Unauthorized", status: 401 }); // Send unauthorized status if not authenticated
  }

  const userID = req.user.id;

  if (userID === undefined) {
    return res.status(400).send({ message: "Invalid User ID", status: 400 }); // Send bad request status if userID is missing
  }

  // Check if the userID matches the authenticated user's ID
  if (req.user.id !== userID) {
    return res.status(403).send({ message: "Forbidden", status: 403 }); // Send forbidden status if IDs do not match
  }

  const userAPIusage = await getUserAPIUsage(userID);

  if (userAPIusage.status === 200) {
    res.status(200).send(userAPIusage);
  } else {
    res.status(userAPIusage.status).send(userAPIusage);
  }
});

// ===================================================================

// ===================================================================
// Revoke GitHub OAuth token
const revokeGitHubToken = async (token) => {
  try {
    const response = await fetch(
      `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/token`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: token }),
      }
    );

    if (response.status === 204) {
      console.log("Token successfully revoked");
      return true;
    } else {
      const errorResponse = await response.json();
      console.error("Failed to revoke token:", errorResponse);
      return false;
    }
  } catch (error) {
    console.error("Error revoking GitHub token:", error);
    return false;
  }
};

// ===================================================================

// ===================================================================
// Delete user account
router.delete("/deleteAccount", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userID = req.user.id;
    const userAPIkey = await getUserAPIkey(userID);

    if (userAPIkey.status !== 200) {
      return res.status(userAPIkey.status).json({ message: "User not found" });
    }

    const token = req.user.token;

    // Revoke GitHub OAuth token
    const tokenRevoked = await revokeGitHubToken(token);
    if (!tokenRevoked) {
      return res.status(500).json({ message: "Failed to revoke GitHub token" });
    }

    // Delete user from database
    const deleteUserResult = await deleteUser(userID);
    if (deleteUserResult.status !== 200) {
      return res
        .status(deleteUserResult.status)
        .json({ message: "Failed to delete user" });
    }

    // Log out user by destroying the session
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Failed to log out" });
      req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Failed to log out" });
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Account deleted successfully" });
      });
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ===================================================================

module.exports = router;
