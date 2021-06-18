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

  return Order;
};
