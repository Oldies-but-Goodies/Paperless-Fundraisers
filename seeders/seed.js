const sequelize = require("../config/connection");
const {
  Customer,
  Fundraiser,
  Order_Details,
  Product,
  User,
  userFundraiser,
  Order
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

  try {
    
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
    
      await Customer.bulkCreate(customersData, {
        individualHooks: true,
        returning: true,
      });
    
      await Product.bulkCreate(productsData, {
        individualHooks: true,
        returning: true,
      });
    
      await Order.bulkCreate(ordersData, {
        individualHooks: true,
        returning: true,
      });
      
      await Order_Details.bulkCreate(orderDetailsData, {
        individualHooks: true,
        returning: true,
      });

  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

seedDatabase();
