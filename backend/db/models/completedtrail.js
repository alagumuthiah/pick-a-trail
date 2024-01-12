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
      CompletedTrail.belongsTo(models.User);
      CompletedTrail.belongsTo(models.Trail);
    }
  }
  CompletedTrail.init({
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CompletedTrail',
  });
  return CompletedTrail;
};
