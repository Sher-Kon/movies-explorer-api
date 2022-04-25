// controllers/create-user.js
// это файл контроллера пользователя

const bcrypt = require('bcryptjs');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err'); // 400
const ConflictError = require('../errors/conflict-err'); // 409

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    })
      .then((user) => res.send({
        name: user.name,
        _id: user.id,
      })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя')); // 400
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('такой пользователь уже зарегистрирован')); // 409
      } else { next(err); }
    });
};
