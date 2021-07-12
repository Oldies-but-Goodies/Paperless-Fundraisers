const router = require('express').Router();
const { Product, Fundraiser, userFundraiser } = require('../../models');

// GET all products for a given fundraiser Id
router.get('/fundraiser/all/:fundraiserId', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    console.log('product');
    const productData = await Product.findAll({
      where: {
        fundraiserId: req.params.fundraiserId,
        active: true,
      },
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// admins see ALL even if they are hidden yo...
//
router.get('/fundraiser/adminall/:fundraiserId', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    console.log('product');
    const productData = await Product.findAll({
      where: {
        fundraiserId: req.params.fundraiserId,
      },
    });
    res.status(200).json(productData);
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
    const productData = await Product.findByPk(req.params.id, {
      //   include: [{ model: Product, through: ' }]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a product

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const { FundraiserId } = req.body;
    console.log(FundraiserId);

    const userFundraiserData = await userFundraiser.findOne({
      where: {
        UserId: req.user.id,
        FundraiserId: FundraiserId,
        admin_level: 'admin',
      },
    });
    console.log(userFundraiserData);
    if (!userFundraiserData)
      return res.json({
        status: 'error',
        message: 'user is not admin',
      });

    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//   UPDATE an product

router.put('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedProduct) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a product

router.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
