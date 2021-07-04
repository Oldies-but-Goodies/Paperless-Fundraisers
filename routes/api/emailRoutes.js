const router = require("express").Router();
// const withAuth = require("../../utilities/authUtils");
const email = require("../../utilities/email");

// TODO add withAuth
router.post("/", async (req, res) => {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ status: 'error', message: info.message });
    }
  try {
      console.log("mailer", req.body);
    const mail = await email(
      req.body.emailTo,
      req.body.emailSubject,
      req.body.emailBody
    );
    console.log(mail);
    res.status(200).json(mail);
  } catch (e) {
    console.log(e);
  }
  })(req, res, next); 
  
});

module.exports = router;
