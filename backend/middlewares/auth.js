//middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { user_id: decoded.id } });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user; // Set the user object in the request for further use
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Middleware to verify user role (assuming 'role' is a boolean field in the user model)
const verifyAdmin = (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!req.user.role) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };