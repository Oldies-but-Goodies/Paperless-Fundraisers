const passport = require('passport');

const LocalStrategy = require('./localStrategy');

passport.serializeUser(function (user, done) {
  done(null, { id: user.id, email: user.email });
});

passport.deserializeUser(function (user, done) {
  done(null, { id: user.id, email: user.email });
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
