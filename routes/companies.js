const router = require('express').Router();

const {getCompanies, getCompany, addCompany, removeCompany, amendCompany} = require('../controllers');

router.route('/')
  .get(getCompanies);
   
router.route('/:company')
  .get(getCompany)
  .post(addCompany)
  .delete(removeCompany)
  .patch(amendCompany);

module.exports = router;