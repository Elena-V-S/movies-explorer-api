const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/un-authorized-err');
const ConflictError = require('../errors/conflict-err');
const {
  messageNotFoundID,
  messageConflictEmail,
  messageNotFoundUser,
} = require('../scripts/errors-massages');
const { JWT_SECRET } = require('../scripts/config');

// возвращает информацию о пользователе (email и имя)
const getProfile = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => new NotFoundError(messageNotFoundID))
    .then((user) => {
      const { name, email } = user;
      return res.status(200).send({ name, email });
    })
    .catch(next);
};

// обновляет информацию о пользователе
const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, email }, {
    new: true, // передаст обновлённый объект на вход обработчику then
    runValidators: true, // валидирует новые данные перед записью в базу
  })
    .then((user) => {
      if (user) {
        res.status(200).send({ name, email });
      } else {
        throw new NotFoundError(messageNotFoundID);
      }
    })
    .catch(next);
};

// регистрация пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(messageConflictEmail);
      }
    })
    .catch(next);
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      // создадим токен JWT сроком на неделю
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      // вернём токен
      res.send({ name, email, token });
    })
    // .then(() => {
    //   res.status(200).send({ name, email });
    // })
    .catch(next);
};

// аутентификация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password') // в случае аутентификации хеш пароля пользователя будет возвращаться
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messageNotFoundUser); // не пройдена аутентификация - ошибка 401
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { // хеши не совпали — отклоняем промис - не пройдена аутентификация
            throw new UnauthorizedError(messageNotFoundUser); //  - ошибка 401
          }
          return user; // аутентификация успешна
        })
        .then(() => {
          // создадим токен JWT сроком на неделю
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          // вернём токен
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getProfile, updateProfile, createUser, login,
};
