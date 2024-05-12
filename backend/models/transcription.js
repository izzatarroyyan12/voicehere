// transcription.js
const { DataTypes } = require('sequelize');
const db = require('../db'); // Import database connection
const User = require('./user'); // Import the User model

const Transcription = db.define('Transcription', {
  transcription_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  audio_file: {
    type: DataTypes.STRING,
    allowNull: true, // Adjust as needed
  },
});

Transcription.belongsTo(User, { foreignKey: 'user_id' }); // Transcription belongs to User

module.exports = Transcription;