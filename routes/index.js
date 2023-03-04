const router = require("express").Router();
const usersRouter = require('./users')
const cardsRouter = require('./cards')

router.use('/users', usersRouter)
router.use('/cards', cardsRouter)
router.use('*', (req, res, next) => {
  req.user = {
    _id: '64037d4152b1b85b61db8ca7',
  };
  next();
});

module.exports = router;
