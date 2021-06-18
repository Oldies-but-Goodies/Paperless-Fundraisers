'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Order.init(
    {
      id: DataTypes.STRING,
      customer_id: DataTypes.INTEGER,
      order_total: DataTypes.INTEGER,
      customer_remit: DataTypes.STRING,
      seller_remit: DataTypes.STRING,   
      order_status: DataTypes.STRING,
      password: DataTypes.STRING,
      last_login: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
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

  return Order;
};
