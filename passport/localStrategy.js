const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;

const strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (email, password, done) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user == null) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    if (!user.comparePassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  }
);

module.exports = strategy;
