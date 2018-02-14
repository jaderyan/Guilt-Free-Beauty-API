if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const config= require('./config');
const router = require('./routes');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const cors = require('cors');

mongoose.connect(db)
  .then(() => console.log('Connected to', db))
  .catch(err => console.log('Error connecting to database', err));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', router);

app.use('/*', (req, res, next) => {
  const err = new Error('Invalid path');
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({error: err.message});
  next();
});

module.exports = app;