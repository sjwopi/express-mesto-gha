const User = require('../../models/user');
const {
  ERROR_CODE_INTERNAL,
} = require('../../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_CODE_INTERNAL).send({ message: 'Ошибка работы сервера' }));
};
