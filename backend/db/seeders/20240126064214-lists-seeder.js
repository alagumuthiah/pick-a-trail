'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return await queryInterface.bulkInsert('Lists', [
      {
        name: 'ToDo',
        userId: 3,
        privacy: 'Followers Only',
        trailList: [2, 3]
      },
      {
        name: 'MyList',
        userId: 2,
        privacy: 'Public',
        trailList: [5, 6]
      }, {
        name: 'TripPlan',
        userId: 2,
        privacy: 'Private',
        trailList: [2]
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
