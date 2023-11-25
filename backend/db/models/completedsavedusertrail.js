'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompletedSavedUserTrail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompletedSavedUserTrail.belongsTo(models.User);
      CompletedSavedUserTrail.belongsTo(models.Trail);
    }
  }
  CompletedSavedUserTrail.init({
    saved: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CompletedSavedUserTrail',
    defaultScope: {
      attributes: {}
    },
    scopes: {
      completedTrail: {
        attributes: ["userId", "trailId", "completed"]
      }
    }
  });
  return CompletedSavedUserTrail;
};
