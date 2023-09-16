'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trail.belongsTo(models.Park, { foreignKey: 'parkId', sourceKey: 'id' });
      Trail.belongsToMany(models.User, { through: models.CompletedSavedUserTrail });
      Trail.belongsToMany(models.User, {
        through: models.Review
      });
      Trail.hasMany(models.Activity, {
        foreignKey: 'trailId', targetKey: 'id'
      });
    }
  }
  Trail.init({
    name: DataTypes.STRING,
    difficulty: {
      type: DataTypes.ENUM,
      values: ['Easy', 'Moderate', 'Hard']
    },
    length: DataTypes.INTEGER,
    elevationGain: DataTypes.INTEGER,
    description: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    tags: {
      type: DataTypes.ENUM,
      values: ['Dog friendly', 'hiking', 'forest', 'lake', 'falls']
    },
  }, {
    sequelize,
    modelName: 'Trail',
  });
  return Trail;
};
