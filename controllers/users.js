// controllers/users.js
// это файл контроллеров пользователя

const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err'); // 400
const NotFoundError = require('../errors/not-found-err'); // 404

module.exports.getUserAuth = (req, res, next) => {
  User.findById(req.user._id)// запрос одного
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');// 404
      } else {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id')); // 400
      } else { next(err); }
    });
};

module.exports.updateProfileUser = (req, res, next) => {
  const { name, email } = req.body;
  // обновим имя, email найденного по _id пользователя
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля')); // 400
      } else { next(err); }
    });
};
