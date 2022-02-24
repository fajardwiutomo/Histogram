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
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};