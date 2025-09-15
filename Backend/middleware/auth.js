const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = function(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
