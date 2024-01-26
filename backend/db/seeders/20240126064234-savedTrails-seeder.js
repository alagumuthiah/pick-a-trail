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
    return await queryInterface.bulkInsert('SavedTrails', [
      {
        userId: 2,
        trailId: 3,
        saved: true
      },
      {
        userId: 2,
        trailId: 3,
        saved: false
      },
      {
        userId: 3,
        trailId: 5,
        saved: true,
      },
      {
        userId: 2,
        trailId: 2,
        saved: true
      },
      {
        userId: 2,
        trailId: 7,
        saved: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SavedTrails', {
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
