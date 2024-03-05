'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
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
      console.log('Inside up');
    }
    catch (error) {
      console.log('ERROR', error);
    }

  },

  async down(queryInterface, Sequelize) {
    console.log('Inside down');
    await queryInterface.removeColumn('Trails', 'latitude');
    await queryInterface.removeColumn('Trails', 'longitude');
  }
};

/*
Common issue - when we run the migration - it shows its successful- but the database doesn't get affected. (check the database connection- not pointing to the intended database - envirnmonet variables not loaded)
*/
