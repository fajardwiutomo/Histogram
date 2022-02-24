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
        through: 'PostHasTag'
      })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    like: DataTypes.INTEGER,
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