const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().default('Введите имя').min(2).max(30),
      about: Joi.string().default('Введите профессию').min(2).max(30),
      avatar: Joi.string().regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});
router.use(errors());

module.exports = router;

const { login, createUser } = require('../controllers/users');
