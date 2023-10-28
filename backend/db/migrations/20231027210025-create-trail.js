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
        references: { model: 'Parks' }
      },
      difficulty: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['Easy', 'Moderate', 'Hard']
      },
      length: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      elevationGain: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING,
        defaultValue: '[]'
      },
      tags: {
        type: Sequelize.STRING,
        defaultValue: '[]'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trails');
  }
};


//To migrate a file - dotenv npx sequelize db:migrate
