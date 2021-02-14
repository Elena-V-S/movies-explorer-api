class ConflictError extends Error { // конфликт запросов
  // Попытка зарегистрировать вторую учетную запись на тот же email
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
module.exports = ConflictError;
