'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });
    }
  }
  List.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    privacy: {
      type: DataTypes.ENUM,
      values: ['Public', 'Followers Only', 'Private'],
      defaultValue: 'Public',
      allowNull: false
    },
    trailList: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};
