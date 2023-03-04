const Card = require('../../models/card');
const { ERROR_CODE_INTERNAL } = require('../../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_CODE_INTERNAL).send({ message: 'Ошибка работы сервера' }));
};
