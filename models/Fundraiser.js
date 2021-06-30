const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fundraiser extends Model {}

Fundraiser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'Fundraiser',
  }
);


module.exports = Fundraiser;
