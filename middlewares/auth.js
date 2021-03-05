// авторизация
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/un-authorized-err');
const { messageUnauthorizedError } = require('../scripts/errors-massages');
const { JWT_SECRET } = require('../scripts/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messageUnauthorizedError);
  }

  const token = authorization.replace('Bearer ', ''); // извлекаем токен
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET); // верифицируем токен
  } catch (err) {
    throw new UnauthorizedError(messageUnauthorizedError);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
