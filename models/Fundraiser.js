const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

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
        allowNull: false,
      },
      created_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
  
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "fundraiser",
    }
  );

  return Fundraiser;
};  

