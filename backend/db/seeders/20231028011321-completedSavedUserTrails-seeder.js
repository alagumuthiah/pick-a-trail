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
    return await queryInterface.bulkInsert('CompletedSavedUserTrails', [
      {
        userId: 1,
        trailId: 3,
        saved: true,
        completed: false
      },
      {
        userId: 2,
        trailId: 5,
        completed: true,
        saved: false
      },
      {
        userId: 1,
        trailId: 2,
        completed: true,
        saved: false
      },
      {
        userId: 2,
        trailId: 4,
        saved: true,
        completed: false
      },
      {
        userId: 1,
        trailId: 1,
        saved: true,
        completed: false
      },
      {
        userId: 2,
        trailId: 7,
        completed: true,
        saved: false
      },
      {
        userId: 1,
        trailId: 7,
        saved: true,
        completed: false
      },
      {
        userId: 1,
        trailId: 6,
        completed: true,
        saved: false
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('CompletedSavedUserTrails', {
      userId: {
        [Op.in]: [1, 2]
      }
    }, {});
  }
};


/*
npx sequelize seed:generate --name <seeder-filename>
dotenv npx sequelize db:seed:all
*/
