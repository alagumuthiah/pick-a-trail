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
      SavedTrail.belongsTo(models.User);
      SavedTrail.belongsTo(models.Trail);
    }
  }
  SavedTrail.init({
    saved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SavedTrail',
  });
  return SavedTrail;
};
