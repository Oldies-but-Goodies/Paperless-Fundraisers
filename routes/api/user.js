const express = require('express');
const crypto = require('crypto');

const { User, Fundraiser } = require('../../models');
const passport = require('../../passport');
const { isValidEmail, isValidPassword } = require('../../utilities/authUtils');

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.user) {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: Fundraiser,
        },
      ],
    });

    if (user) {
      res.json({ user });
      return;
    }

    res.status(404).json({ status: 'error', message: 'User not found' });
  } else {
    res.json({ user: null });
  }
});

router.post('/signup', async function (req, res, next) {
  let user = {};

  user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  console.log(user, 'user');
  if (user) {
    console.log('1');
    res.status(400).json({
      message: `Sorry, a user is already using that email: ${req.body.email}`,
    });
    return;
  }

  if (!isValidPassword(req.body.password)) {
    return res.status(400).json({
      status: 'error',
      message: 'Password must be 8 or more characters.',
    });
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Email address not formed correctly.',
    });
  }

  try {
    user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      role: 'user',
      password: req.body.password,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: 'error',
      message: 'Email address already exists.',
    });
  }

  if (user) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ status: 'error', message: info.message });
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json({ status: 'ok' });
      });
    })(req, res, next);
  }
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
    }

    User.findOne({
      where: {
        id: user.id,
      },
      include: [
        {
          model: Fundraiser,
        },
      ],
    }).then((data) => {
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.json({ status: 'ok', ...data.dataValues });
      });
    });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  console.log('logout');
  // Not sure what / why this res.redirect is not working, but this combo
  // of the req.logOut and then sending the status of 200 gets insomnia to work
  // and also returns us to the home page from the website
  // res.redirect('/');
  req.logOut();
  res.sendStatus(200);
});

router.put('/updatePassword', (req, res, next) => {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
    }

    if (!isValidPassword(req.body.newPassword)) {
      return res.status(400).send('Password must be 8 or more characters.');
    }

    const userData = await User.update(
      {
        password: req.body.newPassword,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    console.log(userData);

    res.json(userData);
  })(req, res, next);
});

//   UPDATE a user (salesperson)
// TODO add with auth
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.update(
      {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      role: 'user',
      password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "No Salesperson found with this id" });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
