var express = require("express");
var router = express.Router();
const { local_library_url } = require("../constants/local-library-constant");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Sake Dev",
    local_library_url: local_library_url,
  });
});

module.exports = router;
