const router = require('express').Router();
const userRoutes = require('./user');

router.use('/users', userRoutes);

module.exports = router;
