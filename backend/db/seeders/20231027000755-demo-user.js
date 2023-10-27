'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('Users', [
      {
        firstName: 'user1',
        lastName: 'demo',
        userName: 'demouser1',
        email: 'demouser1@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        isAdmin: true,
        provider: 'traditional'
      },
      {
        firstName: 'user2',
        lastName: 'demo',
        userName: 'demouser2',
        email: 'demouser2@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        isAdmin: true,
        provider: 'traditional'
      },
      {
        firstName: 'user3',
        lastName: 'demo',
        userName: 'demouser3',
        email: 'demouser3@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        isAdmin: true,
        provider: 'traditional'
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
      username: { [Op.in]: ['demouser1', 'demouser2', 'demouser3'] }
    }, {});
  }
};

/*
npx sequelize seed:generate --name demo-user
dotenv npx sequelize db:seed:all
*/
