var express = require('express')
  , router = express.Router();

// Contact brands page
router.get('/index', function(req, res) {
  res.render("index", { message: "Index page." })
});

module.exports = router;