const User = require('../../models/user');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL,
} = require('../../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => { res.send({ data: user }) })
    .catch(() => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Ошибка при обработке данных' });
      }
      return res.status(ERROR_CODE_INTERNAL).send({ message: 'Ошибка работы сервера' });
    });
};
