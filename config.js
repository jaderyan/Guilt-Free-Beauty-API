module.exports = {
  DB: {
    test: 'mongodb://localhost/cruelty-free-api-test',
    development: process.env.PROD_MONGODB || 'mongodb://localhost/cruelty-free-api'
  },
  PORT: {
    test: 3090,
    development: 3000,
  }
};