const router = require('express').Router();

const {getCompanies, getCompany, addCompany, removeCompany, amendCompany} = require('../controllers');

router.route('/')
  .get(getCompanies)
  .post(addCompany);

router.route('/:company')
  .get(getCompany)
  .delete(removeCompany)
  .patch(amendCompany);

module.exports = router;