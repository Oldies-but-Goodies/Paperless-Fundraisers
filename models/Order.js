'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {}

Order.init(
  {
    order_total: DataTypes.INTEGER,
    customer_remit: DataTypes.STRING,
    seller_remit: DataTypes.STRING,
    order_status: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Order',
  }
);


module.exports = Order;
