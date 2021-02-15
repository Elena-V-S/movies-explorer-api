const express = require('express'); // подключаем express

const helmet = require('helmet');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { errHandler } = require('./middlewares/error-handler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL, PORT } = require('./scripts/config');
const limiter = require('./middlewares/limiter');

const app = express(); // создаем приложение методом express:
// подключаемся к серверу mongo
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json()); // мидлвэр body-parser для собирания пакетов JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // мидлвэр для установки заголовков, связанных с безопасностью
app.use(limiter); // мидлвэр для ограничения числа запросов с одного IP в единицу времени

app.use(requestLogger); // подключаем логгер запросов

app.use(routes);

// обработчики ошибок

// логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик
app.use(errHandler);

app.listen(PORT);
