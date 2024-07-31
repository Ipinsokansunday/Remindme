'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('1983', 10); // Replace 'your_password' with the desired password

    await queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
