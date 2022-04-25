// controllers/update-profile-user.js
// это файл контроллеров пользователя

const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err'); // 400

module.exports.updateProfileUser = (req, res, next) => {
  const { name, email } = req.body;
  // обновим имя, найденного по _id пользователя
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
      name: user.name,
      email: user.email,
      _id: user.id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля')); // 400
      } else { next(err); }
    });
};
