const { User } = require('../models');

const getByUsername = (email) => User.findOne({ where: { email } });
const createUsername = (body) => {
  const { displayName, email, password, image } = body;
  return User.create({ displayName, email, password, image });
};
console.log(createUsername);

module.exports = { getByUsername, createUsername };