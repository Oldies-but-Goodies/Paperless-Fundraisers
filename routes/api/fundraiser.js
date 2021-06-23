const router = require('express').Router();
const { User, fundraiser, userFundraiser } = require('../../models');

// // GET all fundraisers
// router.get('/', async (req, res) => {
//   try {
//     const orderData = await Order.findAll();
//     res.status(200).json(orderData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET a single fundraiser
// router.get('/:id', async (req, res) => {
//   try {
//     const orderData = await Order.findByPk(req.params.id, {
//       // JOIN with Order, using the Order_Details through table
//       include: [{ model: Fundraiser, through: User_Fundraiser, as: 'fundraiser_user_fundraiser' }]
//     });

//     if (!fundraiserData) {
//       res.status(404).json({ message: 'No fundraiser found with this id!' });
//       return;
//     }

//     res.status(200).json(fundraiserData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // CREATE a fundraiser
// router.post('/', async (req, res) => {
//   try {
//     const fundraiserData = await Fundraiser.create(req.body);
//     res.status(200).json(fundraiserData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // DELETE a fundraiser
// router.delete('/:id', async (req, res) => {
//   try {
//     const fundraiserData = await Location.destroy({
//       where: {
//         id: req.params.id
//       }
//     });

//     if (!locationData) {
//       res.status(404).json({ message: 'No fundraiser found with this id!' });
//       return;
//     }

//     res.status(200).json(orderData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
