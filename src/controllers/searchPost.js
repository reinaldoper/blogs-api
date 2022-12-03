const verifyToken = require('../middleware/verifyToken');
const blogService = require('../services/blogService');

module.exports = async (req, res) => {
  const { q } = req.query;
  try {
    const { authorization } = req.headers;
    const aut = 'Expired or invalid token';
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = verifyToken(authorization);
    if (payload.isError) return res.status(401).json({ message: aut });
    const user = await blogService.getAllPost();
    const result = user.filter((item) => item.title.includes(q) || item.content.includes(q));
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};