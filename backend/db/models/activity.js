'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsToMany(models.User, {
        through: models.Comment
      });
    }
  }
  Activity.init({
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    starsReview: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5']
    },
    likes: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};
