'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        activityId: 2,
        comments: 'That looks so cool!!'
      },
      {
        userId: 2,
        activityId: 1,
        comments: 'The views are amazing'
      },
      {
        userId: 1,
        activityId: 3,
        comments: 'That looks so tiring'
      },
      {
        userId: 2,
        activityId: 4,
        comments: 'I love the blue color of the water'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Activities', {
      activityId: {
        [Op.in]: [1, 2, 3, 4]
      }
    }, {});
  }
};
