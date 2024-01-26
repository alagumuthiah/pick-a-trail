'use strict';

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
    return await queryInterface.bulkInsert('CompletedTrails', [
      {
        userId: 3,
        trailId: 5,
        completed: true,
      },
      {
        userId: 2,
        trailId: 2,
        completed: true,
      },

      {
        userId: 3,
        trailId: 7,
        completed: true,
      },
      {
        userId: 2,
        trailId: 6,
        completed: true,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('CompletedTrails', {
      userId: {
        [Op.in]: [2, 3]
      }
    }, {});
  }
};


/*
npx sequelize seed:generate --name <seeder-filename>
dotenv npx sequelize db:seed:all
*/
