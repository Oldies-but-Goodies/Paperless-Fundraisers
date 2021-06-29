const router = require("express").Router();
// const withAuth = require("../../utilities/authUtils");
const email = require("../../utilities/email");

// TODO add withAuth
router.post("/", async (req, res) => {
  try {
    const mail = await email(
      req.body.emailTo,
      req.body.emailSubject,
      req.body.emailBody
    );
    res.status(200).json(mail);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
