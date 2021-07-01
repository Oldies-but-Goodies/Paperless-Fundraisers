'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class userFundraiser extends Model {}

userFundraiser.init(
  {
    admin_level: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'userFundraiser',
  }
);

module.exports = userFundraiser;
