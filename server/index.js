require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = []; // In-memory user storage, replace with a database in production

const SECRET_KEY = process.env.SECRET_KEY; // Access the secret key from the environment variable

// Endpoint to handle user registration
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  users.push(user);
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Endpoint to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
