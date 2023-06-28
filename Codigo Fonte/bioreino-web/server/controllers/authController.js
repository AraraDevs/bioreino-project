const jwt = require('jsonwebtoken');

module.exports = function authController(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Acesso negado!' });

  try {
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = userVerified;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido!' });
  }
};
