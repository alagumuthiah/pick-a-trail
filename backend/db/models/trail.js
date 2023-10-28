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
      Trail.belongsToMany(models.User, { through: models.Review });
    }
  }

  // const validTags = ['Dog friendly', 'hiking', 'forest', 'lake', 'falls'];
  Trail.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM,
      values: ['Easy', 'Moderate', 'Hard']
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    elevationGain: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: DataTypes.TEXT,
    images: DataTypes.ARRAY(DataTypes.STRING),
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING) //validation to be added, the array values has to be one of the following - ['Dog friendly', 'hiking', 'forest', 'lake', 'falls']
    }
  }, {
    sequelize,
    modelName: 'Trail',
  });
  return Trail;
};
