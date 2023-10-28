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
        reviewId: 1,
        likes: [2]
      },
      {
        title: 'A good workout',
        reviewId: 8
      },
      {
        title: 'View is the same, not worth it',
        reviewId: 5,
        likes: []
      },
      {
        title: 'Awesome views of the island',
        reviewId: 8,
        likes: [1]
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
  }
};
