// routes/cards.js
// это файл маршрутов фильмов

const { celebrate, Joi } = require('celebrate');
const routerMovies = require('express').Router(); // создали роутер
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

routerMovies.get('/movies', getMovies);

routerMovies.post('/movies', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(10).max(300),
  }),
}), createMovie);

routerMovies.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = routerMovies; // экспортировали роутер
