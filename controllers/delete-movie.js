// controllers/delete-movie.js
// это файл контроллеров фильмов
// deleteMovie

const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err'); // 404
const ForbiddenError = require('../errors/forbidden-err'); // 403
const BadRequestError = require('../errors/bad-request-err'); // 400

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => { //
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');// 404
      }
      if (String(movie.owner) === req.user._id) {
        return Movie.findByIdAndRemove(req.params.id)
          .then(() => { //
            res.send({ message: 'Фильм удален' });
          });
      }
      throw new ForbiddenError('Нельзя удалять чужой фильм'); // 403
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id')); // 400
      } else { next(err); }
    });
};
