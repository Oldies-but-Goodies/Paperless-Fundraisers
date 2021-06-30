'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  comparePassword(givenPassword) {
    return bcrypt.compareSync(givenPassword, this.password);
  }
  static associate(models) {
    // define association here
  }
}

User.init(
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    // },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    last_login: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
      beforeUpdate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
      //
      // we need BulkUpdate and we need to reach in to the attributes if
      // we are gonna user.update = which we need to change the password
      //
      beforeBulkUpdate: async (userData) => {
        // console.log(userData);
        userData.attributes.password = await bcrypt.hash(
          userData.attributes.password,
          10
        );
        return userData;
      },
    },
  }
);

User.associate = function (models) {
  User.hasMany(models.Order, {
    onDelete: 'cascade',
  });

  User.belongsToMany(models.Fundraiser, {
    through: models.userFundraiser,
  });
};

module.exports = User;
