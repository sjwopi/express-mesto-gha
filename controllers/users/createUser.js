const User = require('../../models/user');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL,
  ERROR_CODE_REPEAT_EMAIL,
} = require('../../utils/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({...req.body, password: hash }))
    .then(({ name, about, avatar, email, _id }) => {
      res.send({ data: {name, about, avatar, email, _id, createdAt }});
    })
    .catch((err) => {
      if (err.code == 11000) {
        return res.status(ERROR_CODE_REPEAT_EMAIL).send({ message: 'Пользователь с указанным email уже зарегистрирован' })
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Ошибка при обработке данных' });
      }
      if (err.code >= 500 && err.code <= 599) {
        return res.status(ERROR_CODE_INTERNAL).send({ message: 'Ошибка работы сервера' })
      };
      next(err)
    });
};
