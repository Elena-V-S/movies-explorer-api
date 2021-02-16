const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  messageFailEmail,
  messageFailURL,
  messageRequiredName,
  messageRequiredEmail,
  messageRequiredPassword,
  messageMinName,
  messageMinPassword,
  messageMaxName,
  messageRequiredField,
} = require('../scripts/massages');

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message(messageFailEmail);
};

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(messageFailURL);
};

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': messageMinName,
        'string.max': messageMaxName,
        'string.empty': messageRequiredName,
      }),
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'string.empty': messageRequiredEmail,
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': messageMinPassword,
        'string.empty': messageRequiredPassword,
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'string.empty': messageRequiredEmail,
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': messageMinPassword,
        'string.empty': messageRequiredPassword,
      }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': messageMinName,
        'string.max': messageMaxName,
        'string.empty': messageRequiredName,
      }),
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'string.empty': messageRequiredEmail,
      }),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.empty': messageRequiredField,
      }),
    director: Joi.string().required()
      .messages({
        'string.empty': messageRequiredField,
      }),
    duration: Joi.number().integer().required()
      .messages({
        'number.empty': messageRequiredField,
      }),
    year: Joi.number().integer().required()
      .messages({
        'number.empty': messageRequiredField,
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': messageRequiredField,
      }),
    image: Joi.string().required().custom(validateURL)
      .messages({
        'string.empty': messageRequiredField,
      }),
    trailer: Joi.string().required().custom(validateURL)
      .messages({
        'string.empty': messageRequiredField,
      }),
    thumbnail: Joi.string().required().custom(validateURL)
      .messages({
        'string.empty': messageRequiredField,
      }),
    owner: Joi.string().alphanum().length(24),
    movieID: Joi.string().required()
      .messages({
        'string.empty': messageRequiredField,
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.empty': messageRequiredField,
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.empty': messageRequiredField,
      }),
  }),
});

module.exports = {
  validateEmail,
  validateURL,
  validateUserBody,
  validateAuthentication,
  validateUser,
  validateId,
  validateMovie,
};
