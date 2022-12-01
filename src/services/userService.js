const { User } = require('../models');

const getByUsername = (email) => User.findOne({ where: { email } });

module.exports = { getByUsername };