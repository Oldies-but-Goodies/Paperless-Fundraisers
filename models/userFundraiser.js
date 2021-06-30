'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    admin_level: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'userFundraiser',
  }
);

userFundraiser.associate = function (models) {
  userFundraiser.belongsTo(models.User);

  userFundraiser.belongsTo(models.Fundraiser);
};

module.exports = userFundraiser;
