const sequelize = require("../config/connection");
const {
  Customers,
  Fundraiser,
  OrderDetails,
  Products,
  User,
  userFundraiser,
  Orders
} = require("../models");

const userData = require("./Users.json");
const fundraisersData = require("./Fundraisers.json");
const userFundraisersData = require("./UsersFundraisers.json");
const customersData = require("./Customers.json");
const orderDetailsData = require("./OrderDetails.json");
const productsData = require("./Products.json");
const ordersData = require("./Orders.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Fundraiser.bulkCreate(fundraisersData, {
    individualHooks: true,
    returning: true,
  });

  await userFundraiser.bulkCreate(userFundraisersData, {
    individualHooks: true,
    returning: true,
  });

  await Customers.bulkCreate(customersData, {
    individualHooks: true,
    returning: true,
  });

  await Products.bulkCreate(productsData, {
    individualHooks: true,
    returning: true,
  });

  await OrderDetails.bulkCreate(orderDetailsData, {
    individualHooks: true,
    returning: true,
  });

  await Orders.bulkCreate(ordersData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
