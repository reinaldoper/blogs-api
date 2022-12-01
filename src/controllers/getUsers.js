const verifyToken = require('../middleware/verifyToken');
const userService = require('../services/userService');

module.exports = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const aut = 'Expired or invalid token';
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = verifyToken(authorization);
    console.log(payload);
    if (payload.isError) return res.status(401).json({ message: aut });
    const user = await userService.getAllUser();
  
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};