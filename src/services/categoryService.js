const { Category } = require('../models');

const createCategory = (name) => Category.create({ name });

const getAllCategory = async () => {
  const user = await Category.findAll();
  return user;
};

module.exports = { createCategory, getAllCategory };