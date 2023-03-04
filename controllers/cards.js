const { getCards } = require('./cards/getCards');
const { createCard } = require('./cards/createCard');
const { deleteCard } = require('./cards/deleteCard');
const { likeCard } = require('./cards/likeCard');
const { dislikeCard } = require('./cards/dislikeCard');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
