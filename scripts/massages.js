// невалидные ссылки и email- адреса
const messageFailEmail = 'Поле "email" должно быть валидным email-адресом';
const messageFailURL = 'Поле "avatar" должно быть валидным url-адресом';
// незаполненные поля
const messageRequiredName = 'Поле "name" должно быть заполнено';
const messageRequiredEmail = 'Поле "email" должно быть заполнено';
const messageRequiredPassword = 'Поле "password" должно быть заполнено';
const messageRequiredField = 'Поле должно быть заполнено';
//  количество символов < min
const messageMinName = 'Минимальная длина поля "name" - 2';
const messageMinPassword = 'Минимальная длина поля "password" - 8';

//  количество символов > max
const messageMaxName = 'Максимальная длина поля "name" - 30';

module.exports = {
  messageFailEmail,
  messageFailURL,
  messageRequiredName,
  messageRequiredEmail,
  messageRequiredPassword,
  messageMinName,
  messageMinPassword,
  messageMaxName,
  messageRequiredField,
};
