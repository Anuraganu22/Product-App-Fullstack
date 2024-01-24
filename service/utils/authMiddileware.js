const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  console.log('token', token)

  if (!token) {
     res.status(401).json({ error: 'Unauthorized' });
     res.send('/login')
  }

  jwt.verify(token, jwtConfig.secretKey, (err, user) => {
    if (err) {
      console.log('error', err)
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
