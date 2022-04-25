// routes/sign.js
// это файл маршрутов регистрации

const { celebrate, Joi } = require('celebrate');
const routerSign = require('express').Router(); // создали роутер

const { createUser } = require('../controllers/create-user');
const { login } = require('../controllers/login');

routerSign.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

routerSign.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = routerSign; // экспортировали роутер
