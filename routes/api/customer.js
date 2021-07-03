const router = require('express').Router();
const { Customer, Order } = require('../../models');


// GET all customers
router.get('/', async (req, res) => {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
    }
  try {
    const customerData = await Customer.findAll();
    res.status(200).json(customerData);
  } catch (err) {
    res.status(500).json(err);
  }
  })(req, res, next);

});

// GET a single customer
router.get('/:id', async (req, res) => {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
    }
  try {
    const customerData = await Customer.findByPk(req.params.id, {
      // JOIN with Order
      include: [{ model: Order }]
    });

    if (!customerData) {
      res.status(404).json({ message: 'No customer found with this id!' });
      return;
    }
  
    res.status(200).json(customerData);
  } catch (err) {
    res.status(500).json(err);
  }
  })(req, res, next);
  
});

// CREATE a customer
router.post('/',  async (req, res) => {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
    }
    try {
      const customerData = await Customer.create(req.body);
      res.status(200).json(customerData);
    } catch (err) {
      res.status(400).json(err);
    }
    })(req, res, next);

  });

//   UPDATE a customer
  router.put('/:id',  async (req, res) => {
    passport.authenticate('local', async function (err, user, info) {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.json({ status: 'error', message: info.message });
      }
    try {
      const updatedCustomer = await Customer.update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          address_line1: req.body.address_line1,
          address_line2: req.body.address_line2,
          city: req.body.city,
          state: req.body.state,
          zip_code: req.body.zip_code,
          phone_number: req.body.phone_number,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (!updatedCustomer) {
        res.status(404).json({ message: 'No customer_id found with this id' });
        return;
      }
      res.json(updatedCustomer);
    } catch (err) {
      res.status(500).json(err);
    }
  })(req, res, next);

  });
  // DELETE a customer
  router.delete('/:id',  async (req, res) => {
    passport.authenticate('local', async function (err, user, info) {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.json({ status: 'error', message: info.message });
      }
    try {
      const customerData = await Customer.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!customerData) {
        res.status(404).json({ message: 'No customer found with this id!' });
        return;
      }
  
      res.status(200).json(customerData);
    } catch (err) {
      res.status(500).json(err);
    }
    })(req, res, next);

  });

module.exports = router;