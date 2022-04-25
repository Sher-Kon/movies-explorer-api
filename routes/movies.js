// routes/cards.js
// это файл маршрутов фильмов

const { celebrate, Joi } = require('celebrate');
const routerMovies = require('express').Router(); // создали роутер
const { validate } = require('../models/movie');
const { getMovies } = require('../controllers/get-movie');
const { createMovie } = require('../controllers/create-movie');
const { deleteMovie } = require('../controllers/delete-movie');

routerMovies.get('/movies', getMovies);

routerMovies.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required().min(2).max(30),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(2).max(300),
    image: Joi.string().required().custom((value, helpers) => {
      if (validate.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image заполнено некорректно');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validate.isURL(value)) {
        return value;
      }
      return helpers.message('Поле trailerLink заполнено некорректно');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validate.isURL(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail заполнено некорректно');
    }),
    movieId: Joi.number().required().min(2).max(30),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), createMovie);

routerMovies.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = routerMovies; // экспортировали роутер
