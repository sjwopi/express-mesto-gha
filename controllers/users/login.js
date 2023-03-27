const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL,
} = require('../../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const tokenJWT = jwt.sign({ _id: user._id }, SECRETKEY, { expiresIn: '7d' });
      res.status(200).send({ tokenJWT });
    })
    .catch(err => next(err));
};
