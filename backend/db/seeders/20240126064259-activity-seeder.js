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
    return await queryInterface.bulkInsert('Activities', [
      {
        title: 'Best views of Mt Rainier',
        likes: [2]
      },
      {
        title: 'A good workout',
        likes: [3]
      },
      {
        title: 'View is the same, not worth it',
        likes: [2]
      },
      {
        title: 'Awesome views of the island',
        likes: [2]
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Activities', {
      title: {
        [Op.in]: [
          'Best views of Mt Rainier',
          'A good workout',
          'View is the same, not worth it',
          'Awesome views of the island'
        ]
      }
    }, {});
  }
};

/*
npx sequelize seed:generate --name parks-seeder
dotenv npx sequelize db:seed:all
*/
