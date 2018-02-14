const router = require('express').Router();
const companiesRouter = require('./companies');

router.use('/companies', companiesRouter);

router.use('/*', (req, res, next) => {
  const err = new Error('Invalid path');
  err.statusCode = 404;
  next(err);
});

module.exports = router;