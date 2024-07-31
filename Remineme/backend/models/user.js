const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleTokens: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    // Model options
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
    underscored: true, // Use snake_case for automatically added attributes
    tableName: 'users', // Specify the table name explicitly
    indexes: [
      {
        unique: true,
        fields: ['username', 'email'],
      },
    ],
  });

  // Define associations here if needed
  User.associate = function(models) {
    // Example association:
    // User.hasMany(models.Post, { foreignKey: 'userId' });
    // More associations can be defined here
  };

  return User;
};
