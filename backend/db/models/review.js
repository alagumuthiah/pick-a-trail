'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Review.belongsTo(models.Trail, {
        foreignKey: 'trailId'
      });
      Review.belongsTo(models.Activity, {
        foreignKey: 'activityId'
      });
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'userId'
    },
    trailId: {
      type: DataTypes.INTEGER,
      field: 'trailId'
    },
    activityId: {
      type: DataTypes.INTEGER,
      field: 'activityId'
    },
    starsReview: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5'],
      field: 'starsReview',
    },
    comment: DataTypes.TEXT,
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
    modelName: 'Review',
    tableName: 'Reviews',
    scopes: {
      selectReview: {
        attributes: {
          include:
            [
              'id',
              'starsReview',
              'comment',
              'createdAt',
              'updatedAt',
              'activityId',
              'userId',
              'trailId'
            ]
        }
      }
    }
  });
  return Review;
};
