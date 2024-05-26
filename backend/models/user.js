const { DataTypes } = require('sequelize');
const sequelize = require('../dbconnect'); // Import your database connection

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
      defaultValue: false,
    },
  },
  {
    tableName: 'user',
    timestamps: false,
  }
);

module.exports = User;
