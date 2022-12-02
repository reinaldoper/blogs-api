const verifyToken = require('../middleware/verifyToken');
const blogService = require('../services/blogService');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  try {
    const aut = 'Expired or invalid token';
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = verifyToken(authorization);
    if (payload.isError) return res.status(401).json({ message: aut });
    const { userId } = payload.data;
    const user = await blogService.getByNewId(Number(id));
    if (user.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });
    await blogService.deletePost(Number(id));
    res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};