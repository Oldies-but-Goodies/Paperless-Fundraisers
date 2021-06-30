const Customer = require('./Customer');
const Fundraiser = require('./Fundraiser');
const Order_Details = require('./Order_Details');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');
const userFundraiser = require('./userFundraiser');

Fundraiser.belongsToMany(User, {
  through: userFundraiser
})

Fundraiser.hasMany(Order)

Fundraiser.hasMany(Product)

User.belongsToMany(Fundraiser, {
  through: userFundraiser
})

User.hasMany(Order)

Customer.hasMany(Order);

Order_Details.belongsTo(Product);

Order_Details.belongsTo(Order, {
  onDelete: 'cascade'
});

Order.belongsTo(User);

Order.belongsTo(Customer);

Order.belongsTo(Fundraiser);

Order.hasMany(Order_Details);

Product.belongsTo(Fundraiser, {
  onDelete: 'cascade'
})

Product.hasMany(Order_Details);

module.exports = {
  Customer,
  Fundraiser,
  Order_Details,
  Order,
  Product,
  User,
  userFundraiser,
};
