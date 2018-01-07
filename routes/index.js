const router = require('express').Router();
const companiesRouter = require('./companies');

router.use('/companies', companiesRouter);

router.use((err, req, res, next) => {
  res.status(500).json(err);
  next();
});

module.exports = router;