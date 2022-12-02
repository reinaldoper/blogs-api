const { BlogPost, PostCategory, sequelize, User, Category } = require('../models');
const { category } = require('../auth/verifyCategory');

const createPost = async (body, userId) => {
  const { title, content, categoryIds } = body;
  const card = await category(categoryIds);
    if (!card) return { type: 400, message: 'one or more "categoryIds" not found' };
  const result = await sequelize.transaction(async (t) => {
    const blog = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postId = blog.dataValues.id;
    const cards = categoryIds
      .map((categoryId) => PostCategory
      .create({ postId, categoryId }, { transaction: t }));
    await Promise.all(cards);
    return blog;
  });
  return { type: null, message: result };
};

const getById = (userId) => BlogPost.findByPk(userId);

const getAllPost = () => BlogPost.findAll({
  include: [{
    model: User, as: 'user', attributes: { exclude: ['password'] },
  },
  {
    model: Category, as: 'categories',
  },
],
});

const getByNewId = (id) => BlogPost.findByPk(id);

const getByAllId = (id) => BlogPost.findOne({
  where: { id },
  include: [{
    model: User, as: 'user', attributes: { exclude: ['password'] },
  },
  {
    model: Category, as: 'categories',
  },
],
});

const updatePost = ({ title, content }, id) => BlogPost.update(
  {
    title,
    content,
  },
  {
    where: { id },
    attributes: { exclude: ['id', 'userId', 'published', 'updated'] },
  },
);

const deletePost = async (id) => {
  await BlogPost.destroy({
    where: { id },
  });
};

module.exports = { createPost,
   getById,
    getAllPost,
     getByAllId, 
     getByNewId, 
     updatePost,
     deletePost,
    };
