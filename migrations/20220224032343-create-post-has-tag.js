'use strict';
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('PostHasTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PostId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Posts"
          },
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      TagId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Tags"
          },
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('PostHasTags');
  }
};