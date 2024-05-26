// transcription.js model
const { DataTypes } = require('sequelize');
const sequelize = require('../dbconnect');
const User = require('./user');

const Transcription = sequelize.define(
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
      allowNull: true,
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

User.hasMany(Transcription, { foreignKey: 'user_id' });
Transcription.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Transcription;