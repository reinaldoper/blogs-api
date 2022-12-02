const verifyToken = require('../middleware/verifyToken');
const blogService = require('../services/blogService');

module.exports = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const aut = 'Expired or invalid token';
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = verifyToken(authorization);
    if (payload.isError) return res.status(401).json({ message: aut });
    const { userId } = payload.data;
    const { type, message } = await blogService.createPost(req.body, userId);
    if (type) return res.status(type).json(message);
    res.status(201).json(message);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};