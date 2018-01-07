const router = require('express').Router();

const {getCompanies, getCompany, addCompany, removeCompany} = require('../controllers');

router.route('/')
  .get(getCompanies)
  .post(addCompany)
  .delete(removeCompany);

router.route('/:company')
  .get(getCompany);

module.exports = router;