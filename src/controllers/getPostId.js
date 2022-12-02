const verifyToken = require('../middleware/verifyToken');
const blogService = require('../services/blogService');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const aut = 'Expired or invalid token';
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = verifyToken(authorization);
    if (payload.isError) return res.status(401).json({ message: aut });
    const user = await blogService.getByNewId(Number(id));
    if (!user) return res.status(404).json({ message: 'Post does not exist' });
    const users = await blogService.getByAllId(Number(id));
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};