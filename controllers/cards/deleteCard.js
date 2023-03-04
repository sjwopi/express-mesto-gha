const { Card } = require('../../models/card');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
} = require('../../utils/constants');

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Ошибка при обработке данных' });
      }
      return res
        .status(ERROR_CODE_INTERNAL)
        .send({ message: 'Ошибка работы сервера' });
    });
};
