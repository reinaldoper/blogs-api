module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    { timestamps: false, underscored: true }
  );

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Blog;
};
