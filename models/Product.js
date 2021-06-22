const { Model, DataTypes, INTEGER } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {

  class Product extends Model {}
  
  Product.init(
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
      price: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      fundraiser_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'Product',
    }
  );

  Product.associate = function(models) {
    Product.belongsTo(models.Fundraiser, {
      onDelete: 'cascade'
    });
  }

  return Product;
};


