// user.js
const { DataTypes } = require('sequelize');
const db = require('../db'); // Import your database connection

const User = db.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Assuming false means regular user and true means admin
  },
});

module.exports = User;