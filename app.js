const express = require('express'); // подключаем express

const helmet = require('helmet');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { errHandler } = require('./middlewares/error-handler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL, PORT } = require('./scripts/config');
const { options } = require('./scripts/cors-options');
const limiter = require('./middlewares/limiter');

const app = express(); // создаем приложение методом express:

app.use('*', cors(options)); // подключаем cors

mongoose.connect(MONGO_URL, { // подключаемся к серверу mongo
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json()); // мидлвэр body-parser для сбора пакетов JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));// для приема веб-страниц внутри POST-запроса
app.use(helmet()); // мидлвэр для установки заголовков, связанных с безопасностью

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter); // мидлвэр для ограничения числа запросов с одного IP в единицу времени

app.use(routes);

// обработчики ошибок

// логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик
app.use(errHandler);

app.listen(PORT);
