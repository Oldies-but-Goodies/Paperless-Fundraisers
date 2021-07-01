const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_line1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_line2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'Customer',
  }
);

module.exports = Customer;
