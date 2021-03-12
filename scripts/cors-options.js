const options = {
  origin: [
    'https://ev-mesto.students.nomoredomains.rocks',
    'http://localhost:3000',
    'http://localhost:8080',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'Authorization',
  ],
  credentials: true,
};
module.exports = { options };
