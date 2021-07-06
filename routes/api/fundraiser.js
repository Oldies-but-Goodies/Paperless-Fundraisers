const passport = require('../../passport');
const router = require('express').Router();
const { Fundraiser, User, Product } = require('../../models');

// GET all fundraisers
router.get('/', async (req, res, next) => {
  console.log('inside');
  console.log(req.user.id);
  console.log(req.user.email);

  //
  // Im not sure what's happening now.  user is not set - but im not sure how it's suppose to be set.
  // this is why this protected route is not working.
  //

  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
    }
    try {
      const fundraiserData = await Fundraiser.findAll();
      res.status(200).json(fundraiserData);
    } catch (err) {
      res.status(500).json(err);
    }
  })(req, res, next);
});

// GET a single fundraiser
router.get('/:fundraiserId', async (req, res, next) => {
  console.log('user -------------', req.user);

  if (!req.user) {
    return res.json({ status: 'error', message: 'not logged in' });
  }

  try {
    const fundraiserData = await Fundraiser.findByPk(req.params.fundraiserId);

    if (!fundraiserData) {
      res.status(404).json({ message: 'No fundraiser found with this id!' });
      return;
    }

    res.status(200).json(fundraiserData);
  } catch (err) {
    res.status(500).json(err);
  }
  // passport.authenticate('local', async function (err, user, info) {
  //   if (err) {
  //     return next(err);
  //   }

  //   if (!user) {
  //     return res.json({ status: 'error', message: info.message });
  //   }
  // })(req, res, next);
});

// CREATE a fundraiser
router.post('/', async (req, res, next) => {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
    }
    try {
      console.log(req.body);
      const fundraiserData = await Fundraiser.create(req.body);
      res.status(200).json(fundraiserData);
    } catch (err) {
      res.status(400).json(err);
    }
  })(req, res, next);
});

// UPDATE a fundraiser
router.put('/:id', async (req, res, next) => {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
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
        res
          .status(404)
          .json({ message: 'No Fundraiser_id found with this id' });
        return;
      }
      res.json(updatedFundraiser);
    } catch (err) {
      res.status(500).json(err);
    }
  })(req, res, next);
});

// DELETE a fundraiser
router.delete('/:id', async (req, res, next) => {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
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
  })(req, res, next);
});

module.exports = router;
