'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Users', [
      {
        firstName: 'user1',
        lastName: 'demo',
        userName: 'demouser1',
        email: 'demouser1@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        location: 'Seattle,Washington',
        provider: 'traditional',
        isAdmin: true,
      },
      {
        firstName: 'user2',
        lastName: 'demo',
        userName: 'demouser2',
        email: 'demouser2@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        location: 'San Francisco,California',
        provider: 'traditional',
        isAdmin: false
      },
      {
        firstName: 'user3',
        lastName: 'demo',
        userName: 'demouser3',
        email: 'demouser3@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        location: 'New York',
        provider: 'traditional',
        isAdmin: false
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      userName: { [Op.in]: ['demouser1', 'demouser2', 'demouser3'] }
    }, {});
  }
};
