var router = require("express").Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ status: 1 });
});

module.exports = router;
