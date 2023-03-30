const { Card } = require('../../models/card');
const {
  ValidationError,
  InternalError,
  NotFoundError
} = require('../../utils/errors');

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Не найдена карточка с указанным id.'))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Переданы некорректные данные карточки'));
      }
      return next(new InternalError('Произошла ошибка на сервере.'));
    });
};
