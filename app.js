const express = require('express'); // подключаем express

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { errHandler } = require('./middlewares/error-handler');
const routes = require('./routes/index');
const { MONGO_URL, PORT } = require('./scripts/config');

const app = express(); // создаем приложение методом express:
// подключаемся к серверу mongo
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json()); // мидлвар body-parser для собирания пакетов JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

// обработчики ошибок

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик
app.use(errHandler);

app.listen(PORT);
