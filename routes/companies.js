const router = require('express').Router();

const {getCompanies, getCompany} = require('../controllers');

router.route('/')
  .get(getCompanies);

router.route('/:company')
  .get(getCompany);

module.exports = router;