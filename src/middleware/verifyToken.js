require('dotenv/config');
const jwt = require('jsonwebtoken');
/* const userService = require('../services/userService'); */

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    return { isError: true, error };
  }
};
