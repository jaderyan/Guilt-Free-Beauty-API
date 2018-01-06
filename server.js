if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const config= require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;

mongoose.connect(db)
  .then(console.log('Connected to', db))
  .catch(err => console.log('Error connecting to database', err));

app.use(bodyParser.json());

app.use(morgan('dev'));

module.exports = app;