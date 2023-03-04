const User = require('../../models/user');
const {
  ERROR_CODE_INTERNAL, ERROR_CODE_NOT_FOUND,
} = require('../../utils/constants');

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res.status(ERROR_CODE_NOT_FOUND).send({ data: 'Пользователь не найден.' });
    })
    .catch(() => res.status(ERROR_CODE_INTERNAL).send({ message: 'Ошибка работы сервера' }));
};
