module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
    },
    { timestamps: false, underscored: true, tableName: 'posts_categories', }
  );

  post.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogs',
      through: post,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: post,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return post;
};