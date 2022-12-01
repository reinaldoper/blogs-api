const verifyToken = require('../middleware/verifyToken');
const categoryService = require('../services/categoryService');

module.exports = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const aut = 'Expired or invalid token';
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = verifyToken(authorization);
    if (payload.isError) return res.status(401).json({ message: aut });
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const user = await categoryService.createCategory(name);
    res.status(201).json({ id: user.id, name: user.name });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
