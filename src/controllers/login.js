require('dotenv/config');
const jwt = require('jsonwebtoken');
/* 
const { JWT_SECRET } = process.env; */
const userService = require('../services/userService');

/* Sua chave secreta. É com ela que os dados do seu usuário serão encriptados.
   Em projetos reais, armazene-a numa variável de ambiente e tenha cuidado com ela, pois só quem tem acesso
   a ela poderá criar ou alterar tokens JWT. */
const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getByUsername(email);
    console.log(user);
  
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' }); 
    }
  
    const token = jwt.sign({ email, password: null, data: { userId: user.id } }, secret, {
      expiresIn: '7h',
      algorithm: 'HS256',
    });
  
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
