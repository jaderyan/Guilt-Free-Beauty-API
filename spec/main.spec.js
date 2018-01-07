process.env.NODE_ENV = 'test';
const seed = require('../seed/test.seed');
const app = require('../server');
const {expect} = require('chai');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe('/api', () => {
  let docs = {};
  beforeEach(function () {
    return mongoose.connection.dropDatabase()
      .then(() => {
        return seed();
      })
      .then((data) => {
        docs = data;
        return docs;
      });
  });
  after(() => {
    mongoose.disconnect();
  });
  describe('/api/companies', () => {
    it('returns a list of all companies', () => {
    });
  });
});

