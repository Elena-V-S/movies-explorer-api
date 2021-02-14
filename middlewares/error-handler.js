const { messageFailServer } = require('../scripts/errors-massages');

module.exports.errHandler = ((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ message: err.status === 500 ? messageFailServer : err.message });
  next();
});
