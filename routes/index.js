const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const notFoundRouter = require('./notFound');
const { createUser, login } = require('../controllers/users');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');
const auth = require('../middlewares/auth');

router.post('/signup', validateUserBody, createUser); // создание пользователя
router.post('/signin', validateAuthentication, login); // аутентификация
router.all('/signup', notFoundRouter);
router.all('/signin', notFoundRouter);

// авторизация
router.use(auth);

router.use('/', usersRouter);
router.use('/', moviesRouter);
router.use('/', notFoundRouter); // переход по несуществующим маршрутам

module.exports = router;
