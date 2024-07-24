const router = require("express").Router();

// auth login
router.get("/login", (req, res) => {
  res.status(200);
});

// auth logout
router.get("/logout", (req, res) => {
  res.send("Logging out");
});

// auth with github
router.get("github", (req, res) => {
  res.send("Logging in with Github");
});

module.exports = router;
