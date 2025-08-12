const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '6J5HFkNGZVTliik6IWFiXz+0W/CNLrq28arALni84JC7/MhKxg6o9/+GPvdv0TeCL9ZebaMA1aGQX9VZtEuFsg==';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
