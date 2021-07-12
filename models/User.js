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

}

User.init(
  {
    
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
      
      beforeBulkUpdate: async (userData) => {
       
        userData.attributes.password = await bcrypt.hash(
          userData.attributes.password,
          10
        );
        return userData;
      },
    },
  }
);

module.exports = User;
