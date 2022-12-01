const userService = require('../services/userService');

module.exports = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const reg = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/;
  const name = '"displayName" length must be at least 8 characters long';
  const pass = '"password" length must be at least 6 characters long';
  if (displayName.length < 8) {
    return res.status(400).json({ message: name });
  }
  if (!reg.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: pass });
  }
  const user = await userService.getByUsername(email);
  if (user) {
    return res.status(409).json({ message: 'User already registered' }); 
  }
  next();
};
