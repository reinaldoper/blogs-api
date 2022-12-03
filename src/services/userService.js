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

const getById = async (id) => {
  const employee = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return employee;
};

const deleteUser = async (id) => {
   await User.destroy({
    where: { id },
  });
};

module.exports = { getByUsername, createUsername, getAllUser, getById, deleteUser };