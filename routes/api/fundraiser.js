const router = require('express').Router();
const { Fundraiser, User, Product, Order, Order_Details } = require('../../models');
// GET all fundraisers
router.get('/', async (req, res, next) => {
  console.log('inside');
  // console.log(req.user.id);
  // console.log(req.user.email);

  // if (!req.user) {
  //   return res.json({ status: 'error', message: 'not logged in' });
  // }
  try {
    const fundraiserData = await Fundraiser.findAll();
      res.status(200).json(fundraiserData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// GET a single fundraiser
// CC Example
router.get('/:fundraiserId', async (req, res, next) => {

  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
 try {
    const fundraiserData = await Fundraiser.findByPk(req.params.fundraiserId,
      {
        include: [{
          model: Order,
          include: [{
            model: Order_Details,
            include: [{
              model: Product
            }]
          }]
        }]
      });

  if (!fundraiserData) {
      res.status(404).json({ message: 'No fundraiser found with this id!' });
      return;
    }

  //  console.log(fundraiserData.dataValues.Orders)

    const totalFundraiserSales = fundraiserData.dataValues.Orders.reduce((total, current) => {
      const addition = current.dataValues.Order_Details.reduce((totalForDetails, currentDetail) => {
        // console.log("currentDetails", currentDetail);
        const qty = currentDetail.dataValues.product_qty;
        const price =  parseInt(currentDetail.dataValues.Product.dataValues.price);
        const newTotal = qty * price + totalForDetails;
        return newTotal;
      }, 0);
      // console.log( "addition", addition)
      return addition + total;
    }, 0)


    res.status(200).json({ fundraiserData, totalFundraiserSales });
  } catch (err) {
    res.status(500).json(err);
  }
});



// CREATE a fundraiser
router.post('/', async (req, res, next) => {
  console.log(req.body);
  if (!req.user) {
      return res.json({ status: 'error', message: 'not logged in' });
    }
  try {
  const fundraiserData = await Fundraiser.create(req.body);
  
      res.status(200).json(fundraiserData);
    } catch (err) {
      res.status(400).json(err);
    }
});
// UPDATE a fundraiser
router.put('/:id', async (req, res, next) => {
    if (!req.user) {
      return res.json({ status: 'error', message: 'not logged in' });
    }
    try {
      const updatedFundraiser = await Fundraiser.update(
        {
          name: req.body.name,
          start: req.body.start,
          end: req.body.end,
          description: req.body.description,
          goal: req.body.goal,
        },
        {   
          where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedFundraiser) {
      res.status(404).json({ message: 'No Fundraiser_id found with this id' });
      return;
    }
    res.json(updatedFundraiser);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE a fundraiser
// TODO add with auth
router.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const fundraiserData = await Fundraiser.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!fundraiserData) {
      res.status(404).json({ message: 'No fundraiser found with this id!' });
      return;
    }
    res.status(200).json(fundraiserData);
  } catch (err) {
    res.status(500).json(err);
  }
   
});

module.exports = router;