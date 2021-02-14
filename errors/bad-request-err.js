class BadRequestError extends Error { // когда с запросом что-то не так
  // ( ValidationError, CastError, brcrypt undefined error)
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
module.exports = BadRequestError;
