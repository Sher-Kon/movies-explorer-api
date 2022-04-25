// controllers/login.js
// это файл контроллеров пользователя

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET = 'some-secret-key' } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err'); // 401

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта (или пароль)'));// Неправильные почта
      }
      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные (почта или) пароль'));// хеши не совпали у пароля
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({
        // _id: user.id,
        token,
      });// вернём токен
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message)); // 401
    });
};
