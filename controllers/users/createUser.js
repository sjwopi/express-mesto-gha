const User = require('../../models/user');
const {
  ValidationError,
  InternalError,
  ConflictError,
} = require('../../utils/errors/index');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      ...req.body, password: hash,
    }))
    .then(({
      name, about, avatar, email, _id, createdAt,
    }) => {
      res.status(OK).send(
        {
          data: {
            name, about, avatar, email, _id, createdAt,
          },
        },
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с указанным email уже зарегистрирован'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('Переданы некорректные данные пользователя'));
      }
      return next(new InternalError('Произошла ошибка на сервере.'));
    });
};
