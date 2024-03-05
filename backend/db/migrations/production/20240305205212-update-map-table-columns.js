'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Trails', 'latitude', {
      type: Sequelize.DECIMAL(10, 6),
      allowNull: false,
      defaultValue: 47.608013
    });

    await queryInterface.addColumn('Trails', 'longitude', {
      type: Sequelize.DECIMAL(10, 6),
      allowNull: false,
      defaultValue: -122.335167
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Trails', 'latitude');
    await queryInterface.removeColumn('Trails', 'longitude');
  }
};
