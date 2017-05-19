var express = require('express')
  , router = express.Router();

// Contact brands page
router.get('/gettransaction', function(req, res) {
  res.render("gettransaction", { message: "gettransaction page." })
});

module.exports = router;