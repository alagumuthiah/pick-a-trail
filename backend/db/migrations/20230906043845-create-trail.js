'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      parkId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Parks' }
      },
      difficulty: {
        type: Sequelize.ENUM,
        values: ['Easy', 'Moderate', 'Hard']
      },
      length: {
        type: Sequelize.INTEGER
      },
      elevationGain: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      tags: {
        type: Sequelize.ENUM,
        values: ['Dog friendly', 'hiking', 'forest', 'lake', 'falls']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trails');
  }
};
