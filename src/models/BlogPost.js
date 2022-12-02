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
      published: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
      updated: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    },
    { timestamps: false, underscored: true }
  );

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Blog;
};
