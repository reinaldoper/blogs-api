const { User } = require('../models');

const getByUsername = (email) => User.findOne({ where: { email } });
const createUsername = (body) => {
  const { displayName, email, password, image } = body;
  return User.create({ displayName, email, password, image });
};
const getAllUser = async () => {
  const user = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return user;
};

module.exports = { getByUsername, createUsername, getAllUser };