const Company = require('../models/companies');

const savedData = {};

function saveCompanies () {
  const companies = [
    {name: 'Bare Minerals', website: 'https://www.bareminerals.co.uk/'},
    {name: 'Kat Von D',  website: 'https://www.katvondbeauty.com/'},
    {name: 'Barry M', website: 'https://www.barrym.com/'}
  ].map(company => new Company(company).save());
  return Promise.all(companies)
}

function saveTestData () {
  return saveCompanies()
    .then((company) => {
      savedData.companies = company;
      return savedData;
    });
    
}

module.exports = saveTestData;