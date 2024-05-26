// transcription.js model
const { DataTypes } = require('sequelize');
const db = require('../dbconnect'); // Import database connection
const User = require('./user'); // Import the User model

const Transcription = db.define(
  'Transcription',
  {
    transcription_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
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
    audio_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'transcription',
    timestamps: false,
  }
);

module.exports = Transcription;