const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

function isUrl(link) {
  if (!validator.isURL(link)) {
    throw new Error('Неверный формат URL');
  }
  return link;
};

const validateId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});
const validateProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isUrl),
  }),
});

const validateFormSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isUrl),
  }),
});

const validateFormSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateId,
  validateProfileInfo,
  validateAvatar,
  validateFormSignUp,
  validateFormSignIn
};
