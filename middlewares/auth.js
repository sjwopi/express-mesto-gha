const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');
const { secretKey } = require('../utils/constants');

module.exports.validateToken = (req, res, next) => {
  
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация')
  }

  req.user = payload;
  next();
};
