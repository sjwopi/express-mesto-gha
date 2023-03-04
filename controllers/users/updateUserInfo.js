const User = require('../../models/user');
const {
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL,
} = require('../../utils/constants');

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: updatedUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Ошибка при обработке данных' });
      } if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Ошибка при обработке данных' });
      }
      return res
        .status(ERROR_CODE_INTERNAL)
        .send({ message: 'Ошибка работы сервера' });
    });
};
