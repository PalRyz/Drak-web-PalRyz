const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Username already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Incorrect password' });

    res.json({ message: 'Login successful', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});

module.exports = router;
