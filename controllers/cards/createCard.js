const { Card } = require('../../models/card');
const {
  ValidationError,
  InternalError,
} = require('../../utils/errors');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(new InternalError('Произошла ошибка на сервере.'));
    });
};
