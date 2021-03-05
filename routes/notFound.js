const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { messageNotFoundError } = require('../scripts/errors-massages');

router.all('*', (req, res, next) => next(new NotFoundError(messageNotFoundError)));

module.exports = router;
