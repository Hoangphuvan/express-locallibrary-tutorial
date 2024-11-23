var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("first");
  //res.send("respond with a resource");
  next();
});

router.get("/", function (req, res, next) {
  console.log("second");
  res.send("respond with a resource");
});

module.exports = router;
