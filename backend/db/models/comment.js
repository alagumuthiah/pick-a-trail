'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Comment.belongsTo(models.Activity, {
        foreignKey: 'activityId'
      });
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'userId'
    },
    activityId: {
      type: DataTypes.INTEGER,
      field: 'activityId'
    },
    comments: DataTypes.TEXT,
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
    modelName: 'Comment',
    tableName: 'Comments'
  });
  return Comment;
};
