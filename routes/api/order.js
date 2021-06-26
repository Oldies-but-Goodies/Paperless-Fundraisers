// const router = require('express').Router();
// const { User, Order, Customer, orderDetails, Fundraiser } = require('../../models');

// // GET all orders 
// router.get('/', async (req, res) => {
//   try {
//     const orderData = await Order.findAll();
//     res.status(200).json(orderData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET a single order
// router.get('/:id', async (req, res) => {
//   try {
//     const orderData = await Order.findByPk(req.params.id, {
//       // JOIN with Order, using the Order_Details through table
//       include: [{ model: Order, through: Order_Details, as: 'order_order_details' }]
//     });

//     if (!orderData) {
//       res.status(404).json({ message: 'No order found with this id!' });
//       return;
//     }

//     res.status(200).json(orderData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // CREATE an order
// router.post('/', async (req, res) => {
//   try {
//     const orderData = await Order.create(req.body);
//     res.status(200).json(orderData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // DELETE an order
// router.delete('/:id', async (req, res) => {
//   try {
//     const orderData = await Location.destroy({
//       where: {
//         id: req.params.id
//       }
//     });

//     if (!locationData) {
//       res.status(404).json({ message: 'No order found with this id!' });
//       return;
//     }

//     res.status(200).json(orderData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
