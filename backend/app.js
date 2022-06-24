const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const { ValidationError } = require('sequelize');

// check to see if you are in the production environment
const { environment } = require('./config');
const isProduction = environment === 'production';

// initialize the Express application
const app = express();

// middleware for logging info about req and res
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

// security middleware

if(!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet sets headers for app security
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
);

// set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true
    }
  })
);

//connect to all the routes
app.use(routes);

// catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error('The requested resource could not be found');
  err.title = 'Resource Not Found';
  err.errors = ['The requested resource could not be found'];
  err.status = 404;
  next(err);
});

// process sequelize errors
app.use((err, _req, _res, next) => {
  //check if error is a sequelize error
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error'
  }
  next(err);
});

// error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
