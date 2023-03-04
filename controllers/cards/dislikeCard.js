const { Card } = require('../../models/card');
const {
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL,
} = require('../../utils/constants');

module.exports.dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Ошибка при обработке данных' });
      }
      return res
        .status(ERROR_CODE_INTERNAL)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
