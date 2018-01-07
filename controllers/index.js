const Company = require('../models/companies');

function getCompanies (req, res, next) {
  return Company.find().lean()
    .then((companies) => {
      res.send({companies});
    })
    .catch(next);
}

function getCompany (req, res, next) {
  const company = req.params.company.split('+').join(' ');
    
  return Company.find({name: company}).lean()
    .then((company) => {
      res.send({company});
    })
    .catch(next);
    
}

module.exports = {getCompanies, getCompany};