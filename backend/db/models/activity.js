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
      Activity.hasOne(models.Review, {
        foreignKey: 'activityId'
      });
      Activity.hasMany(models.Comment, {
        foreignKey: 'activityId'
      });
    }
  }
  Activity.init({
    title: DataTypes.STRING,
    likes: DataTypes.ARRAY(DataTypes.INTEGER),
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
    modelName: 'Activity',
    tableName: 'Activities'
  });
  return Activity;
};
