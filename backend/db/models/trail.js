'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trail extends Model {

    static associate(models) {
      // define association here
      Trail.belongsTo(models.Park, { foreignKey: 'parkId', sourceKey: 'id' });
      // Trail.hasMany(models.CompletedTrail);
      // Trail.hasMany(models.SavedTrail);
      // Trail.belongsToMany(models.User, { through: models.Review });
    }
  }

  // const validTags = ['Dog friendly', 'hiking', 'forest', 'lake', 'falls'];
  Trail.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parkId: {
      type: DataTypes.INTEGER,
      field: 'parkId'
    },
    difficulty: {
      type: DataTypes.ENUM,
      values: ['Easy', 'Moderate', 'Hard']
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    elevationGain: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'elevationGain'
    },
    description: DataTypes.TEXT,
    images: DataTypes.ARRAY(DataTypes.STRING),
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING), //validation to be added, the array values has to be one of the following - ['Dog friendly', 'hiking', 'forest', 'lake', 'falls']

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
    modelName: 'Trail',
    tableName: 'Trails',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Trail;
};
