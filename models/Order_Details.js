const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_Details extends Model {}
  
  Order_Details.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      product_qty: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      line_total: {
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
      modelName: "order_details",
    }
  );

  return Order_Details
};


