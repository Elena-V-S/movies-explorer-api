const messageFailServer = 'На сервере произошла ошибка';
const messageUnauthorizedError = 'Необходима авторизация';
const messageNotFoundError = 'Запрашиваемый ресурс не найден';
const messageNotFoundID = 'Нет пользователя с таким id';
const messageNotFoundUser = 'Неправильные почта или пароль';
const messageBadRequest = 'Переданы некорректные данные';
const messageConflictEmail = 'Пользователь с таким email уже существует';
const messageConflictMovieID = 'Этот фильм уже добавлен в избранное';

const messageNotFoundMovie = 'Фильм не найден';
const messageSuccessDelete = 'Фильм удален';
const messageForbiddenError = 'Вы не можете удалить данный фильм';

module.exports = {
  messageFailServer,
  messageUnauthorizedError,
  messageNotFoundError,
  messageNotFoundID,
  messageBadRequest,
  messageConflictEmail,
  messageConflictMovieID,
  messageNotFoundUser,
  messageNotFoundMovie,
  messageSuccessDelete,
  messageForbiddenError,
};
