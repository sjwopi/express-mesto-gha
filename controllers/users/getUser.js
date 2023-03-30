const User = require('../../models/user');
const {
  ValidationError,
  NotFoundError,
  InternalError,
} = require('../../utils/errors');

module.exports.getUser = (req, res, next) => {
  let userId;
  if (req.params.userId) userId = req.params.userId;
  else userId = req.user._id;
  User.findById(userId).orFail(new NotFoundError(`Пользователь с указанным id не найден`))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Переданы некорректные данные пользователя'));
      }
      return next(new InternalError('Произошла ошибка на сервере.'));
    });
};
