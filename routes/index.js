const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);



router.all('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'));
});
router.use(errors());

module.exports = router;

const { login, createUser } = require('../controllers/users');
