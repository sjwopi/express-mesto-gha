const User = require('../../models/user');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL,
} = require('../../utils/constants');

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((updatedAvatar) => res.send({ data: updatedAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Ошибка при обработке данных' });
      }
      return res
        .status(ERROR_CODE_INTERNAL)
        .send({ message: 'Ошибка работы сервера' });
    });
};
