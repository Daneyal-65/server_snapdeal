const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const authentication = require("../middleware/authentication");

const app = express.Router();

// Login Route (POST)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user._id }, "auth");
    res.status(200).json({ token, msg: "Login successful" });
  } catch (error) {
    res.status(500).json({ msg: "server Error" });
  }
});

// Register Route (POST)
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists with email !" });
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword });

    const token = jwt.sign({ id: user._id }, "auth");
    res.status(201).json({ token, msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User Info Route (GET)
app.use(authentication); // Middleware for authentication

app.get("/user", async (req, res) => {
  const userId = req.body.id; // Get user ID from the token payload

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user); // Return user data
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = app;
