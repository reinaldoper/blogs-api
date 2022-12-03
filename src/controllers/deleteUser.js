const verifyToken = require('../middleware/verifyToken');
const userService = require('../services/userService');

module.exports = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const aut = 'Expired or invalid token';
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = verifyToken(authorization);
    if (payload.isError) return res.status(401).json({ message: aut });
    const { userId } = payload.data;
    await userService.deleteUser(userId);
    res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};