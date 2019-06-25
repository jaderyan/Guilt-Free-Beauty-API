const Company = require('../models/companies');

function getCompanies(req, res, next) {
  if (req.query.website) {
    return Company.findOne({ website: new RegExp(req.query.website) })
      .then(company => {
        company
          ? res.send({ company })
          : res
            .status(404)
            .json({ error: 'Company is not currently in the database' });
      })
      .catch(err => next(err));
  } else {
    return Company.find()
      .then(companies => {
        res.send({ companies });
      })
      .catch(err => next(err));
  }
}

function getCompany(req, res, next) {
  const company = req.params.company;
  const companyName = new RegExp(company, 'gi');

  return Company.find({ name: companyName })
    .then(([company]) => {
      company
        ? res.send({ company })
        : res
          .status(404)
          .json({ message: 'Company is not currently in the database' });
    })
    .catch(err => next(err));
}

function addCompany(req, res, next) {
  const company = req.params.company;
  const newCompany = new Company(req.body);

  return Company.find({ name: company })
    .then(company =>
      company.length
        ? res.status(400).send({
          message: `${newCompany.name} already exists in the database`
        })
        : newCompany
    )
    .catch(err => next(err))
    .then(newCompany.save())
    .catch(err => next(err))
    .then(company => res.send({ company }))
    .catch(err => next(err));
}

function removeCompany(req, res, next) {
  const company = req.params.company;

  return Company.findOneAndRemove({ name: company })
    .then(
      res
        .status(200)
        .send({ message: `${company} has been removed from the database` })
    )
    .catch(err => next(err));
}

function amendCompany(req, res, next) {
  const update = req.body;
  const company = req.params.company;

  return Company.findOneAndUpdate(company, update, { new: true })
    .then(company => {
      res.status(200).send({ company });
    })
    .catch(err => next(err));
}

module.exports = {
  getCompanies,
  getCompany,
  addCompany,
  removeCompany,
  amendCompany
};
