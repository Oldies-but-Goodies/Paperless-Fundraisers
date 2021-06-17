'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userFundraiser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  userFundraiser.init(
    {
      id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      fundraiser_id: DataTypes.INTEGER,
      customer_remit: DataTypes.STRING,
      admin_level: DataTypes.STRING,   
    },
    {
      sequelize,
      modelName: 'userFundraiser',
    }
  );

  User.prototype.isValidPassword = function (password) {
    if (password.length >= 8) {
      return true;
    }

    return false;
  };

  User.prototype.isValidUserID = function (id) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(String(email).toLowerCase());
  };

  return userFundraiser;
};
