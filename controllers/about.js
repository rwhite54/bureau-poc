var express = require('express')
  , router = express.Router();

// Contact brands page
router.get('/about', function(req, res) {
  res.render("about", { message: "About page." })
});

module.exports = router;