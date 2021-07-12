const router = require('express').Router();
const {
  User,
  Order,
  Customer,
  Order_Details,
  Fundraiser,
} = require('../../models');

// GET all orders
router.get('/fundraiser/all/:fundraiserId', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const orderData = await Order.findAll({
      where: {
        fundraiserId: req.params.fundraiserId,
      },
      include: [{ model: User }],
    });
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all order for a given userid

router.get('/allOrdersforUser/:id', async (req, res) => {
  // console.log(req);
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const orderData = await Order.findAll({
      where: {
        userId: req.params.id,
      },
      include: [{ model: Customer }],
    });
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single order
router.get('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const orderData = await Order.findByPk(req.params.id, {});

    if (!orderData) {
      res.status(404).json({ message: 'No order found with this id!' });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an order

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const { orderObj, customer, productsObj } = req.body;

    // create a new customer

    const customerData = await Customer.create(customer);

    console.log(customerData);

    // order
    const orderObjNew = {
      ...orderObj,
      UserId: req.user.id,
      CustomerId: customerData.dataValues.id,
    };

    const orderData = await Order.create(orderObjNew);

    console.log(orderData);

    const productsArr = [];

    for (const productId in productsObj) {
      let product = {
        ProductId: productId,
        product_qty: productsObj[productId],
      };

      productsArr.push(product);
    }

    let orderDetailsData = await Promise.all(
      productsArr.map((val) =>
        Order_Details.create({
          ...val,
          OrderId: orderData.dataValues.id,
        })
      )
    );

    console.log(orderDetailsData);

    res.status(200).json([customerData, orderData, orderDetailsData]);
  } catch (err) {
    res.status(400).json(err);
  }
});

//   UPDATE an order

router.put('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const updatedOrder = await Order.update(
      {
        customer_id: req.body.customer_id,
        order_total: req.body.order_total,
        customer_remit: req.body.customer_remit,
        seller_remit: req.body.seller_remit,
        order_status: req.body.order_status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: 'No Order found with this id' });
      return;
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE an order

router.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const orderData = await Order.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!orderData) {
      res.status(404).json({ message: 'No Order found with this id!' });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
