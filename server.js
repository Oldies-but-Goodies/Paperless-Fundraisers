require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});

const sessionStore = new MySQLStore(
  {
    checkExpirationInterval: parseInt(process.env.DB_CHECK_EXP_INTERVAL, 10),
    expiration: parseInt(process.env.DB_EXPIRATION, 10),
  },
  connection
);

/* Create a cookie that expires in 1 day */
const expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 1);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.DB_SECRET,
    store: sessionStore,
    cookie: { expires: expireDate },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
