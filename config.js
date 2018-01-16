module.exports = {
  DB: {
    test: 'mongodb://localhost/cruelty-free-api-test',
    development: PROD_MONGODB,
  },
  PORT: {
    test: 3090,
    development: 3000,
  }
};