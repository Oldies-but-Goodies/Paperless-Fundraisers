"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Order extends Model {}

Order.init(
  {
    order_total: {type: DataTypes.INTEGER},
    customer_remit: {
      type: DataTypes.STRING,
      defaultValue: "no"
    },
    seller_remit: {
      type: DataTypes.STRING,
      defaultValue: "no"
    },
    order_status: {
      type: DataTypes.STRING,
      defaultValue: "ordered"
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Order",
  }
);

module.exports = Order;
