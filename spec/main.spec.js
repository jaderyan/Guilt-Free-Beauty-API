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
  describe('GET /api/companies', () => {
    it('returns a list of all companies and status code of 200', () => {
      return request
        .get('/api/companies')
        .expect(200)
        .then((res) => {
          expect(res.body.companies.length).to.equal(3);
        });
    });
  });
  describe('GET /api/companies/:company', () => {
    it('returns details of the company specified', () => {
      return request
        .get('/api/companies/Barry+M')
        .expect(200)
        .then((res) => {
          expect(res.body.company[0].name).to.equal('Barry M');
        });
    });
  });
});

