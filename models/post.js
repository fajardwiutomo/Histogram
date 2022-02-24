'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsToMany(models.Tag, {
        through: models.PostHasTag,
        foreignKey: "TagId"
      })
    }
  }
  Post.init({
    title:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "title must be filled"
        }
      }
    },
    content: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "content must be filled"
        }
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: "Image URL cannot be empty"
        }
      }
    } ,
    like: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.like = 0
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};