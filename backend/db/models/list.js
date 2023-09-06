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
    privacy: {
      type: DataTypes.ENUM,
      values: ['Public', 'Followers Only', 'Private']
    },
    trailList: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};
