const { Card } = require('../../models/card');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INTERNAL,
} = require('../../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res
        .status(ERROR_CODE_INTERNAL)
        .send({ message: 'Ошибка работы сервера' });
    });
};
