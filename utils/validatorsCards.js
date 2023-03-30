const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

function isUrl(link) {
  if (!validator.isURL(link)) {
    throw new Error('Неверный формат URL');
  }
  return link;
};

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(isUrl),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateCard,
  validateCardId
};
