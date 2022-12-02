const { Category } = require('../models');

const category = async (array) => {
  const categories = await Category.findAll({ attributes: ['id'] });
  const newCat = categories.map((item) => item.id);
  const result = newCat.every((id) => array.includes(id));
  return result;
};

module.exports = { category };