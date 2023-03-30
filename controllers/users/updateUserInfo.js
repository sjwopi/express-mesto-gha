const User = require('../../models/user');
const {
  ValidationError,
  NotFoundError,
  InternalError,
} = require('../../utils/errors/index');

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(new NotFoundError(`Пользователь с указанным не найден`))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('Переданы некорректные данные пользователя'));
      }
      return next(new InternalError('Произошла ошибка на сервере.'));
    });
};
