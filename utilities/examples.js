
// generic auth protected route
router.put('/', (req, res, next) => {
    passport.authenticate('local', async function (err, user, info) {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.json({ status: 'error', message: info.message });
      }
  
      // do work here
      

  
    })(req, res, next);
  });