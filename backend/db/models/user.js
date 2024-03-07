'use strict';
const bcrypt = require('bcryptjs');
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
    toSafeObject() { //the fields that can be used as jwt claims
      const { id, userName, email } = this;
      return { id, userName, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static async getCurrentUserById(id) {
      return await User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            userName: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ firstName, lastName, userName, email, password, location }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        hashedPassword: hashedPassword,
        location,
        provider: 'traditional',
        isAdmin: false
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      //we are defining both belongToMany association and other associations hasMany and belongTo so that we can perform eager loading - all include operations
      User.belongsToMany(models.Trail, {
        through: models.SavedTrail,
        foreignKey: 'userId',
        otherKey: 'trailId'
      });
      User.hasMany(models.SavedTrail, { foreignKey: 'userId' });
      User.belongsToMany(models.Trail, {
        through: models.CompletedTrail,
        foreignKey: 'userId',
        otherKey: 'trailId'
      });
      User.hasMany(models.CompletedTrail, {
        foreignKey: 'userId'
      });
      User.hasMany(models.List, {
        foreignKey: 'userId',
        sourceKey: 'id'
      });
      User.hasMany(models.Review, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId'
      });

    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'firstName',
      validate: {
        len: [4, 30],
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'lastName',
      validate: {
        len: [4, 30]
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'userName',
      validate: {
        len: [4, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email',
      validate: {
        isEmail: {
          msg: 'Invalid email format. Please provide a valid email address.'
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
      field: 'hashedPassword'
    },
    location: {
      type: DataTypes.STRING,
      field: 'location'
    },
    profilePicture: {
      type: DataTypes.STRING,
      field: 'profilePicture'
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      field: 'isAdmin',
    },
    provider: {
      type: DataTypes.ENUM,
      values: ['traditional', 'google', 'github', 'facebook'],
      field: 'provider'
    },
    followers: DataTypes.ARRAY(DataTypes.INTEGER),
    following: DataTypes.ARRAY(DataTypes.INTEGER),
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
    tableName: 'Users',
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "provider", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword", "provider", "createdAt", "updatedAt"] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};


//sequelize.literal and sequelize.fn can be used to remove an element form an array of followers/ following
