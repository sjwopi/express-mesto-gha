const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateCard,
  validateCardId,
} = require("../utils/validatorsCards");

//router.get('/', getCards);
//router.post('/', validateCard, createCard);
//router.delete('/:cardId', validateCardId,  deleteCard);

//router.put('/:cardId/likes', validateCardId, likeCard);
//router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
