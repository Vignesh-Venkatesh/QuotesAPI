const authRoutes = require("./auth/auth");

const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json);

// Auth Routes
app.use("/auth", authRoutes);

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
