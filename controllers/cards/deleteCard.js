const { Card } = require('../../models/card');
const {
  ValidationError,
  InternalError,
  NotFoundError,
  ForbiddenError
} = require('../../utils/errors');

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Не найдена карточка с указанным id.'))
    .then((cardDoc) => {
      if (req.user._id !== cardDoc.owner.toString()) {
        return next(new ForbiddenError('Нельзя удалять чужую карточку'));
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.send({ message: `Карточка с указанным id удалена` }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(new InternalError('Произошла ошибка на сервере.'));
    });
};
