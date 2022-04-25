// controllers/get-user-auth.js
// это файл контроллеров пользователя

const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err'); // 400
const NotFoundError = require('../errors/not-found-err'); // 404

module.exports.getUserAuth = (req, res, next) => {
  User.findById(req.user._id)// запрос одного
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователь с указанным _id не найден');// 404
      } else {
        res.send({
          name: users.name,
          email: users.email,
          _id: users._id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id')); // 400
      } else { next(err); }
    });
};
