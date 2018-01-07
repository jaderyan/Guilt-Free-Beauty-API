const router = require('express').Router();

const getCompanies = require('../controllers');

router.route('/')
  .get(getCompanies);

module.exports = router;