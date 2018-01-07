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

function addCompany (req, res, next) {
  const newCompany = new Company ({
    name: req.body.name,
    website: req.body.website
  });
  return Promise.all([newCompany, Company.insertMany([newCompany])])
    .then(([newCompany]) => {
      res.status(201).send(newCompany);
    })
    .catch(next);
}

function removeCompany (req, res, next) {
  const company = req.params.company.split('+').join(' ');

  return Company.findOneAndRemove({name: company})
    .then(res.status(200).send(`${company} has been removed from the database`))
    .catch(next);
}

module.exports = {getCompanies, getCompany, addCompany, removeCompany};