'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailUser.belongsTo(models.User,{
        foreignKey: "UserId"        
      })
    }
    age() {
      let check = new Date()
      let age = check - this.dateOfBirth
      age = age / (1000 * 60 * 60 * 24 * 365.25)
      age = Math.floor(age)
      return age
    }
    get convertDate() {
      return this.dateOfBirth.toISOString().split('T')[0]
    }
  }
  DetailUser.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'first name is required!' }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'last name is required!' }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: { msg: 'Date is required!' },
        validateAge(dateOfBirth) {
          let check = new Date()
          let age = check - dateOfBirth
          age = age / (1000 * 60 * 60 * 24 * 365.25)
          age = Math.floor(age)
          if (age < 17) {
            throw new Error('minimum 17 years old')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DetailUser',
  });
  return DetailUser;
};