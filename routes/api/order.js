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
  try {
    const orderData = await Order.findAll({
      where: {
        fundraiserId: req.params.fundraiserId,
        // active: true
      },
      include: [{ model: User }],
    });
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET all orders by fundraiser
// router.get("/", async (req, res) => {
//   try {
//     const orderDetails = await Order_Details.findAll(
//       {
//         fundraiser_id: req.body.fundraiser,
//         order_id: req.body.order_id,
//         product_id: req.body.product_id,
//         product_qty: req.body.product_qty,
//         line_total: req.body.line_total,

//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(orderDetails);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

//
// get all order for a given userid
//
router.get('/allorderforuser/:id', async (req, res) => {
  console.log(req);

  try {
    const orderData = await Order.findAll({
      where: {
        //
        // TODO -- needs to where by the current fundraiserId
        //
        // fundraiserId: req.params.fundraiserId,
        userId: req.params.id,
      },
      // include: [{ model: User }],
    });
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single order
router.get('/:id', async (req, res) => {
  try {
    const orderData = await Order.findByPk(req.params.id, {
      // JOIN with Order, using the Order_Details through table
      //   include: [{ model: Order, through: Order_Details, as: 'order_details' }]
    });

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
// TODO add with auth
router.post('/', async (req, res) => {
  try {
    // we need, customer details, products and quanitiy, fundraiser id,
    // req.body = {
    //   orderObj: {
    //     // order details
    //   },
    //   productsObj: {
    //     1: 2,
    //     5: 2,
    //   },
    //   customer: {

    //   },
    //   FundraiserId: ""
    // }
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
    // // create multiple order details

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
// TODO add with auth
router.put('/:id', async (req, res) => {
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
      res.status(404).json({ message: 'No Order_id found with this id' });
      return;
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE an order
// TODO add with auth
router.delete('/:id', async (req, res) => {
  try {
    const orderData = await Order.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!orderData) {
      res.status(404).json({ message: 'No order found with this id!' });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
