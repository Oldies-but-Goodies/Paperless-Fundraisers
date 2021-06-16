const sequelize = require("../config/connection");

class Order_Details extends Model {}

Order_Details.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      autoIncrement: true,
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

module.exports = Order_Details;
