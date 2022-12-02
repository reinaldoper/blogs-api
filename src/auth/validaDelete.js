const blogService = require('../services/blogService');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const user = await blogService.getByNewId(Number(id));
  if (!user) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};