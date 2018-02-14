const Company = require('../models/companies');

function getCompanies(req, res, next) {
  return Company.find()
    .then(companies => {
      res.send({ companies });
    })
    .catch(next);
}

function getCompany(req, res, next) {
  const company = req.params.company;

  return Company.find({ name: company })
    .then(company => {
      company.length ? res.send({ company }) : res.status(404).json({ message: 'Company is not currently in the database' });
    })
    .catch(next);
}

function addCompany(req, res, next) {
  const company = req.body.name;
  const newCompany = new Company(req.body);

  return Company.find({ name: company })
    .then(company => company.length ? res.status(400).send({ message: `${newCompany.name} already exists in the database` }) : newCompany)
    .then(() => newCompany.save())
    .then(company => res.send({ company }))
    .catch(next);
}

function removeCompany(req, res, next) {
  const company = req.params.company;

  return Company.findOneAndRemove({ name: company })
    .then(res.status(200).send({ message: `${company} has been removed from the database` }))
    .catch(next);
}

function amendCompany(req, res, next) {
  const update = req.body;
  const company = req.params.company;

  return Company.findOneAndUpdate(company, update, { new: true })
    .then(company => {
      res.status(200).send({ company });
    })
    .catch(next);
}

module.exports = { getCompanies, getCompany, addCompany, removeCompany, amendCompany };