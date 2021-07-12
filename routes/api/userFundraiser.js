const router = require('express').Router();
const {
  userFundraiser,
  User,
  Fundraiser,
  Product,
  Order,
  Order_Details,
} = require('../../models');

// GET all UFs
router.get('/', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const userFundraiserData = await userFundraiser.findAll();
    res.status(200).json(userFundraiserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:fundraiserId/users/:userId', async (req, res, next) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  console.log('req.user.id', req.user.id);
  try {
    const fundraiserData = await Fundraiser.findByPk(req.params.fundraiserId, {
      include: [
        {
          model: Order,
          where: {
            userId: req.user.id,
          },
          include: [
            {
              model: Order_Details,
              include: [
                {
                  model: Product,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!fundraiserData) {
      res
        .status(404)
        .json({ message: 'No orders associated with this user id!' });
      return;
    }

    const totalUserSales = fundraiserData.dataValues.Orders.reduce(
      (total, current) => {
        const addition = current.dataValues.Order_Details.reduce(
          (totalForDetails, currentDetail) => {
            // console.log("currentDetails", currentDetail);
            const qty = currentDetail.dataValues.product_qty;
            const price = parseInt(
              currentDetail.dataValues.Product.dataValues.price
            );
            const newTotal = qty * price + totalForDetails;
            return newTotal;
          },
          0
        );

        return addition + total;
      },
      0
    );

    res.status(200).json({ fundraiserData, totalUserSales });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all fundraisers for a given user
router.get('/myfundraisers', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const userFundraiserData = await userFundraiser.findAll({
      where: { userId: req.user.id },
    });
    if (userFundraiserData.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'user not mapped to a fundraiser',
      });
    }
    res.status(200).json(userFundraiserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a fundraiser

router.post('/addusertofundraiser', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: 'not logged in' });
  }
  try {
    const { addUserToFundraiserObj } = req.body;
    console.log(addUserToFundraiserObj);

    const addUserToFundraiserData = await userFundraiser.create(req.body);
    res.status(201).json(addUserToFundraiserData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
