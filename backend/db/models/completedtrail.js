'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompletedTrail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompletedTrail.belongsTo(models.User, { foreignKey: 'userId' });
      CompletedTrail.belongsTo(models.Trail, { foreignKey: 'trailId' });
    }
  }
  CompletedTrail.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'userId'
    },
    trailId: {
      type: DataTypes.INTEGER,
      field: 'trailId'
    },
    completed: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedAt'
    }
  }, {
    sequelize,
    modelName: 'CompletedTrail',
    tableName: 'CompletedTrails'
  });
  return CompletedTrail;
};
