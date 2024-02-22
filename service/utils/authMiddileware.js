const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');

const authenticateToken = (req, res, next) => {
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

    // here we are appending the user's information into the request payload, so that each endpoint can access it.
    // it will be available in the request.user property of the actual function call.
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
