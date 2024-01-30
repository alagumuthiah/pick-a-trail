'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedTrail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SavedTrail.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      SavedTrail.belongsTo(models.Trail, {
        foreignKey: 'trailId'
      });
    }
  }
  SavedTrail.init({
    saved: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      field: 'userId'
    },
    trailId: {
      type: DataTypes.INTEGER,
      field: 'trailId'
    },
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
    tableName: 'SavedTrails',
    modelName: 'SavedTrail',
  });
  return SavedTrail;
};
