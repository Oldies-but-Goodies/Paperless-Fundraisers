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
      modelName: "Fundraiser",
    }
  );

  Fundraiser.associate = function(models) {
    Fundraiser.hasMany(models.Order, {
      onDelete: 'cascade'
    });

    Fundraiser.belongsToMany(models.User, {
      through: models.userFundraiser
    });

    Fundraiser.hasMany(models.product, {
      onDelete: 'cascade'
    });
  }

  return Fundraiser;
};  

