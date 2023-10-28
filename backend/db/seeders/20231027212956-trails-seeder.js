'use strict';

// const { Park } = require('../../db/models');

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
    return await queryInterface.bulkInsert('Trails', [
      {
        name: 'Skyline Trail Loop',
        parkId: 1,
        difficulty: 'Hard',
        length: 5.7,
        elevationGain: 1768,
        description: "Head out on this 5.7-mile loop trail near Paradise, Washington. Generally considered a challenging route, it takes an average of 3 h 30 min to complete. This is a very popular area for backpacking, hiking, and running, so you'll likely encounter other people while exploring.",
        tags: "No dogs, Hiking, Rocky"
      },
      {
        name: 'Silver Falls Loop',
        parkId: 1,
        difficulty: 'Easy',
        length: 2.9,
        elevationGain: 521,
        description: 'Check out this 2.9-mile loop trail near Paradise, Washington. Generally considered an easy route, it takes an average of 1 h 22 min to complete.',
        tags: 'Camping, Hiking'
      },
      {
        name: 'Mount Storm King',
        parkId: 2,
        difficulty: 'Hard',
        length: 4.1,
        elevationGain: 2106,
        description: 'Proceed cautiously on this 4.1-mile out-and-back trail near Port Angeles, Washington. Generally considered a highly challenging route, it should only be attempted by experienced adventurers.',
        tags: 'No dogs, Forest,Lake'
      },
      {
        name: 'Sol Duc Falls Trail',
        parkId: 2,
        difficulty: 'Easy',
        length: 1.6,
        elevationGain: 226,
        description: 'Head out on this 1.6-mile out-and-back trail near Joyce, Washington. Generally considered an easy route, it takes an average of 42 min to complete.',
        tags: 'Hiking, Kids Friendly'
      },
      {
        name: 'Sliding Sands',
        parkId: 5,
        difficulty: 'Hard',
        length: 11,
        elevationGain: 2066,
        description: 'Check out this 11.0-mile point-to-point trail near Kula, Maui. Generally considered a challenging route',
        tags: 'Rocky,Hiking'
      },
      {
        name: 'Koko Crater Tramway',
        parkId: null,
        difficulty: 'Hard',
        length: 1.6,
        elevationGain: 912,
        description: 'Check out this 1.6-mile out-and-back trail near Honolulu, Oahu. Generally considered a challenging route, it takes an average of 1 h 25 min to complete',
        tags: 'No dogs, No shade'
      },
      {
        name: 'Diamond Head Crater',
        parkId: null,
        difficulty: 'Moderate',
        length: 1.9,
        elevationGain: 515,
        description: 'Try this 1.9-mile out-and-back trail near Honolulu, Oahu. Generally considered a moderately challenging route, it takes an average of 1 h 5 min to complete.',
        tags: 'No dogs, Kids friendly'
      }
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
    return queryInterface.bulkDelete('Trails', {
      name: {
        [Op.in]: [
          'Skyline Trail Loop',
          'Silver Falls Loop',
          'Mount Storm King',
          'Sol Duc Falls Trail',
          'Sliding Sands',
          'Koko Crater Tramway',
          'Diamond Head Crater'
        ]
      }
    }, {});

  }
};

/*
npx sequelize seed:generate --name parks-seeder
dotenv npx sequelize db:seed:all
*/
