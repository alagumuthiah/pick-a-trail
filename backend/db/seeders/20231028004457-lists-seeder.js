'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return await queryInterface.bulkInsert('Lists', [
      {
        name: 'ToDo',
        userId: 2,
        privacy: 'Followers Only',
        trailList: JSON.stringify([1, 2])
      },
      {
        name: 'MyList',
        userId: 1,
        privacy: 'Public',
        trailList: JSON.stringify([5, 6])
      }, {
        name: 'TripPlan',
        userId: 1,
        privacy: 'Private',
        trailList: JSON.stringify([1])
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Lists', {
      name: {
        [Op.in]: [
          'ToDo',
          'MyList',
          'TripPlan'
        ]
      }
    }, {});
  }
};

/*
npx sequelize seed:generate --name parks-seeder
dotenv npx sequelize db:seed:all
*/
