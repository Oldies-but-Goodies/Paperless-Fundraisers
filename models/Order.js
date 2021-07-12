'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {}

Order.init(
  {
    order_total: DataTypes.INTEGER,
    customer_remit: {
      type: DataTypes.BOOLEAN,
    defaultValue: false
  },
    seller_remit: {
      type: DataTypes.BOOLEAN,
    defaultValue: false
    },
    order_status: {
      type:  DataTypes.STRING,
      defaultValue: "open"
    }
      
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Order',
  }
);

module.exports = Order;
