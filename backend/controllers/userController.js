// userController.js
const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Check if password length meets the requirement
    if (password.length < 6 || password.length > 12) {
      return res.status(400).json({ error: 'Password must be 6-12 characters' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Error registering user' });
  }
};