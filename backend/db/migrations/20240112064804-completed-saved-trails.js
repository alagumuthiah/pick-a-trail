'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //Create completedtrails table
    await queryInterface.createTable('CompletedTrails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      trailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Trails' }
      },
      completed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

    //create saved trails table
    await queryInterface.createTable('SavedTrails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      trailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Trails' }
      },
      saved: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    //Move data from old table to new table
    await queryInterface.sequelize.query(`
      INSERT INTO SavedTrails (userId,trailId,saved,createdAt, updatedAt)
      SELECT userId, trailId, saved, createdAt, updatedAt FROM CompletedSavedUserTrails;

      INSERT INTO  CompletedTrails(userId,trailId,completed,createdAt, updatedAt)
      SELECT userId, trailId, completed, createdAt, updatedAt FROM CompletedSavedUserTrails;
    `);

    //Delete the old table
    await queryInterface.dropTable('CompletedSavedUserTrails');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //recreate the original table
    await queryInterface.createTable('CompletedSavedUserTrails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' }
      },
      trailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Trails' }
      },
      saved: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      completed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

    //Move the data from two tables to the original table

    await queryInterface.sequelize.query(`
      INSERT INTO CompletedSavedUserTrails (id, userId,trailId,completed,createdAt, updatedAt)
      SELECT id, userId,trailId,completed,createdAt, updatedAt FROM CompletedTrails;

      UPDATE CompletedSavedUserTrails
      SET saved = SavedTrails.saved
      FROM SavedTrails
      WHERE CompletedSavedUserTrails.id = SavedTrails.id;
    `);

    //delete the two tables
    await queryInterface.dropTable('CompletedTrails');
    await queryInterface.dropTable('SavedTrails');
  }
};
