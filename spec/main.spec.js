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
  describe('GET /*', () => {
    it('returns a 404 if the path is invalid', () => {
      return request
        .get('/test')
        .expect(404)
        .then(res => {
          expect(res.body.error).to.equal('Invalid path');
        });
    });
  });
  describe('GET /api/*', () => {
    it('returns a 404 if the path is invalid', () => {
      return request
        .get('/api/test')
        .expect(404)
        .then(res => {
          expect(res.body.error).to.equal('Invalid path');
        });
    });
  });
  describe('GET /api/companies', () => {
    it('returns a list of all companies and status code of 200', () => {
      return request
        .get('/api/companies')
        .expect(200)
        .then(res => {
          expect(res.body.companies.length).to.equal(3);
        });
    });
    it('if a query url is passed, returns a company matching that url', () => {
      return request
        .get('/api/companies?website=barrym.com')
        .expect(200)
        .then(res => {
          expect(res.body.company.name).to.equal('Barry M');
        });
    });
    it('if a query url is passed and there is no matching company returns a 404', () => {
      return request
        .get('/api/companies?website=google.com')
        .expect(404)
        .then(res => {
          expect(res.body.error).to.equal('Company is not currently in the database');
        });
    });
  });
  describe('GET /api/companies/:company', () => {
    it('returns details of the company specified', () => {
      return request
        .get('/api/companies/Barry%20M')
        .expect(200)
        .then(res => {
          expect(res.body.company[0].name).to.equal('Barry M');
        });
    });
    it('returns a status code of 404 if a company is not in the database', () => {
      return request
        .get('/api/companies/test')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Company is not currently in the database');
        });
    });
  });
  describe('POST /api/companies/:company', () => {
    it('adds a company to the database', () => {
      const company = {name: 'By Terry', website: 'https://www.byterry.com/'};
      return request
        .post('/api/companies/By%20Terry')
        .send(company)
        .expect(200)
        .then(res => {
          expect(res.body.company.name).to.equal(company.name);
          expect(res.body.company.website).to.equal(company.website);
        });
    });
    it('duplicates are not allowed to be added to the database', () => {
      const company = {name: 'Bare Minerals', website: 'https://www.bareminerals.co.uk/'};
      return request
        .post('/api/companies/Bare%20Minerals')
        .send(company)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(`${company.name} already exists in the database`);
        });
    });
  });
  describe('DELETE /api/companies/:company', () => {
    it('removes the specified company', () => {
      return request
        .delete('/api/companies/Barry%20M')
        .expect(200)
        .then(res => {
          expect(res.body.message).to.equal('Barry M has been removed from the database')
        });
    });
  });
  describe('PATCH /api/companies/:company', () => {
    it('amends the specified company', () => {
      const amendment = {website: 'www.google.com'};
      return request
        .patch('/api/companies/Barry%20M')
        .send(amendment)
        .expect(200)
        .then(res => {
          expect(res.body.company.website).to.equal(amendment.website);
        });
    });
  });
});

