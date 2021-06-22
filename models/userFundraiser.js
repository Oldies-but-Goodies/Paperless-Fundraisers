'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userFundraiser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  userFundraiser.init(
    {
      user_id: DataTypes.INTEGER,
      fundraiser_id: DataTypes.INTEGER,
      customer_remit: DataTypes.STRING,
      admin_level: DataTypes.STRING,   
    },
    {
      sequelize,
      modelName: 'userFundraiser',
    }
  );

  userFundraiser.associate = function(models) {
    userFundraiser.belongsTo(models.User);

    userFundraiser.belongsTo(models.Fundraiser);
  }

  return userFundraiser;
};
