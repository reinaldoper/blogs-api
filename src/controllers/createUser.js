require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await userService.createUsername({ displayName, email, password, image });
    const payload = {
      displayName, 
      email, 
      password: null,
      image,
    };
    const token = jwt.sign({ payload, data: { userId: user.id } }, secret, {
      expiresIn: '7h',
      algorithm: 'HS256',
    });
  
    res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
