'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.List, { foreignKey: 'userId', targetKey: 'id' });
      User.belongsToMany(models.Trail, { through: models.CompletedSavedUserTrail });
      User.belongsToMany(models.Trail, { through: models.Review });
      User.hasMany(models.Activity, { foreignKey: 'userId', targetKey: 'id' });
      User.belongsToMany(models.Activity, {
        through: models.Comment
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    provider: {
      type: DataTypes.ENUM,
      values: ['traditional', 'google', 'github', 'facebook']
    },
    followers: DataTypes.ARRAY(DataTypes.INTEGER),
    following: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
