class NotFoundError extends Error { // ресурс не найден
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = NotFoundError;
