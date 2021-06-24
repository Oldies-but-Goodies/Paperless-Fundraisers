const router = require('express').Router();
const customerRoutes = require('./customer');
const fundraiserRoutes = require('./fundraiser');
const orderRoutes = require('./order');
const orderDetailsRoutes = require('./orderDetails');
const productRoutes = require('./product');
const userRoutes = require('./user');
const userFundraiserRoutes = require('./userFundraiser');

router.use('/customer', customerRoutes);
router.use('/fundraiser', fundraiserRoutes);
router.use('/order', orderRoutes);
router.use('/orderDetails', orderDetailsRoutes);
router.use('/product', productRoutes);
router.use('/users', userRoutes);
router.use('/userFundraiser', userFundraiserRoutes);


module.exports = router;
