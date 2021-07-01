const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order_Details extends Model {}

Order_Details.init(
  {
    product_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'Order_Details',
  }
);


module.exports = Order_Details;
