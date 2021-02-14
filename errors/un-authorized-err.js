class UnauthorizedError extends Error { // когда что-то не так при аутентификации или авторизации
  // Отсутствие токена (JWT), некорректный токен (JWT), невозможно авторизоваться
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
module.exports = UnauthorizedError;
