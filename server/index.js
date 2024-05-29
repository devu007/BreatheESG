require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const users = []; // In-memory user storage

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error("SECRET_KEY is not set in the environment variables.");
  process.exit(1);
}

// Endpoint to handle user registration
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = { email, password };
  users.push(user);

  try {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error signing the token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    try {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      console.error("Error signing the token:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
