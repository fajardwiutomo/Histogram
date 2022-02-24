'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostHasTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostHasTag.belongsTo(models.Post, {foreignKey: "PostId"})
      PostHasTag.belongsTo(models.Tag, {foreignKey:"TagId"})
    }
  }
  PostHasTag.init({
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostHasTags',
  });
  return PostHasTag;
};