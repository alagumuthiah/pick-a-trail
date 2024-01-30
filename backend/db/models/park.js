'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Park extends Model {

    //get all Parks Information
    static async getParkInfo() {
      const parks = await Park.findAll();
      return parks;
    }

    static async getParkById(id) {
      const park = await Park.findByPk(id);
      return park;
    }

    static async createPark(newPark) {
      return await Park.create(newPark);
    }

    static async updateParkById(parkId, parkInfo) {
      const parkTobeUpdated = await Park.getParkById(parkId);
      const updatedPark = await parkTobeUpdated.update(parkInfo);
      return updatedPark;
    }

    static async deleteParkById(parkId) {
      const rowsDeleted = await Park.destroy({
        where: {
          id: parkId,
        }
      });
      if (rowsDeleted > 0) {
        return true;
      } else {
        return false;
      }
    }

    static associate(models) {
      // define association here
      Park.hasMany(models.Trail, { foreignKey: 'parkId', targetKey: 'id' });
    }
  }
  Park.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'name'
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'area'
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
    modelName: 'Park',
    tableName: 'Parks',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }

  });
  return Park;
};
