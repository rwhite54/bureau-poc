var express = require('express')
  , router = express.Router();

// Contact brands page
router.get('/contact', function(req, res) {
  res.render("contact", { message: "Contact rob page." })
});

module.exports = router;