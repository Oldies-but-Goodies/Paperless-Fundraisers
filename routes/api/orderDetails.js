const router = require('express').Router();
const {
  User,
  Order,
  Customer,
  Order_Details,
  Fundraiser,
  Product,
} = require('../../models');

// GET all order details
router.get('/', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const orderDetails = await Order_Details.findAll();
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all order details for a given order id
router.get('/allOrderDetailsForOrder/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }

  try {
    const orderDetails = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: Customer },
        {
          model: Order_Details,
          include: [{ model: Product }],
        },
      ],
    });
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/allOrderDetailsForUser/', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }

  try {
    const orderDetails = await Order.findAll({
      where: {
        UserID: req.user.id,
      },
      include: [
        { model: Customer },
        {
          model: Order_Details,
          include: [{ model: Product }],
        },
      ],
    });
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
// GET a single order detail
router.get('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const orderDetails = await Order_Details.findByPk(req.params.id, {});

    if (!orderDetails) {
      res.status(404).json({ message: 'No details found with this id!' });
      return;
    }

    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE  order detail

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const orderDetails = await Order_Details.create(
      {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        product_qty: req.body.product_qty,
        line_total: req.body.line_total,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(400).json(err);
  }
});

//   UPDATE an order detail

router.put('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const updatedOrderDetails = await Order_Details.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedOrderDetails) {
      res.status(404).json({ message: 'No details found with this id' });
      return;
    }
    res.json(updatedOrderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE an order details

router.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const orderDetails = await Order_Details.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!orderDetails) {
      res.status(404).json({ message: 'No details found with this id!' });
      return;
    }

    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
