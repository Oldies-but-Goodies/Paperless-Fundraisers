'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      salt: DataTypes.STRING,
      password: DataTypes.STRING,
      last_login: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.prototype.isValidPassword = function (password) {
    if (password.length >= 8) {
      return true;
    }

    return false;
  };

  User.prototype.isValidEmail = function (email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(String(email).toLowerCase());
  };

  return User;
};
