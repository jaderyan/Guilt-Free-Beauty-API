const mongoose = require('mongoose');
const DBs = require('../config');

const DB_URL = DBs.DB.dev;

mongoose.connect(DB_URL)
  .then((db) => {
    console.log(`Connected to the database ${DB_URL}`)
})