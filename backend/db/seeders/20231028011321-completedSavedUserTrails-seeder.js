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
        saved: true
      },
      {
        userId: 2,
        trailId: 5,
        completed: true
      },
      {
        userId: 1,
        trailId: 2,
        completed: true
      },
      {
        userId: 2,
        trailId: 4,
        saved: true
      },
      {
        userId: 1,
        trailId: 1,
        saved: true
      },
      {
        userId: 2,
        trailId: 7,
        completed: true
      },
      {
        userId: 1,
        trailId: 7,
        saved: true
      },
      {
        userId: 1,
        trailId: 6,
        completed: true
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
