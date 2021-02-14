class ForbiddenError extends Error { // пользователю не разрешён доступ к конечной точке
  constructor(message) {
    super(message);
    this.status = 403;
  }
}
module.exports = ForbiddenError;
