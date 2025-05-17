'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Post extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'Posts',
      timestamps: true,
    }
  );
  
  return Post;
};
