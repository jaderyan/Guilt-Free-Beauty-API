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
        .get('/api/companies/Barry%20M')
        .expect(200)
        .then((res) => {
          expect(res.body.company[0].name).to.equal('Barry M');
        });
    });
  });
  describe('POST /api/companies/', () => {
    it('adds a company to the database', () => {
      const company = {name: 'By Terry', website: 'https://www.byterry.com/'};
      return request
        .post('/api/companies')
        .send(company)
        .expect(200)
        .then(() => {
          return request.get('/api/companies');
        })
        .then((res) => {
          expect(res.body.companies.length).to.equal(4);
        });
    });
    it('duplicates are not allowed to be added to the database', () => {
      const company = {name: 'Bare Minerals', website: 'https://www.bareminerals.co.uk/'};
      return request
        .post('/api/companies')
        .send(company)
        .expect(200)
        .then((res) => {
          expect(res.text).to.equal(`${company.name} already exists in the database`);
        })
        .then(() => {
          return request.get('/api/companies');
        })
        .then((res) => {
          expect(res.body.companies.length).to.equal(3);
        });
    });
  });
  describe('DELETE /api/companies/:company', () => {
    it('removes the specified company', () => {
      return request
        .delete('/api/companies/Barry+M')
        .expect(200)
        .then(() => {
          return request.get('/api/companies');
        })
        .then((res) => {
          expect(res.body.companies.length).to.equal(2);
        });
    });
  });
  describe('PATCH /api/companies/:company', () => {
    it('amends the specified company', () => {
      const amendment = {website: 'www.google.com'};
      return request
        .patch('/api/companies/Barry+M')
        .send(amendment)
        .expect(200)
        .then((res) => {
          expect(res.body.website).to.equal(amendment.website);
        });
    });
  });
});

