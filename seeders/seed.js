const sequelize = require("../config/connection");
const {
  Customer,
  Fundraiser,
  Order_Details,
  Product,
  user,
  userFundraiser,
} = require("../models");

const userData = require("./Users.json");
const fundraisersData = require("./Fundraisers.json");
const userFundraisersData = require("./UsersFundraisers.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await GolfCourse.bulkCreate(fundraisersData, {
    individualHooks: true,
    returning: true,
  });

  await RoundOfGolf.bulkCreate(userFundraisersData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
