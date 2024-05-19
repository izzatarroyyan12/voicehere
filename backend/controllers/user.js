//controller user
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res) => {
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

    // Generate a random user_id (UUID)
    const user_id = uuidv4();

    // Create a new user
    const newUser = await User.create({
      user_id,
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


// Login function
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Case-insensitive search for username
    const user = await User.findOne({ where: { username: username.toLowerCase() } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const accessToken = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200)
      .cookie(
        'token', accessToken, {
          httpOnly: true,
          secure: true
        })
      .json({
        message: 'Login success',
        token: accessToken,
        user
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Logout function
const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No user is logged in' });
  }
  try {
    res.status(200)
      .clearCookie('token')
      .json({ message: 'Logout success' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Export all functions together
module.exports = { registerUser, loginUser, logoutUser };
