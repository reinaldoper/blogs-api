const { Category } = require('../models');

const createCategory = (name) => Category.create({ name });

module.exports = { createCategory };