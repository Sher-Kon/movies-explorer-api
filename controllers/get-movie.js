// controllers/get-movie.js
// это файл контроллеров фильмов
// getMovies

const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({}) // запрос всех
    .then((movies) => res.send({ movies }))//
    .catch(next);
};
