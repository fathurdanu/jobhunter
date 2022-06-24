'use strict';
const { encryptPwd } = require('../helpers/bcrypt')
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
      User.hasMany(models.Job);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notNull: {
          msg: 'Please enter username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: {
          msg: "Invalid email"
        },
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Please enter password'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Name can't be empty"
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks:{
      beforeCreate: function (user, options) {
        user.password = encryptPwd(user.password)
      },
      beforeUpdate: function (user, options) {
        user.password = encryptPwd(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};