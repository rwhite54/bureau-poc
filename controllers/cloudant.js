var express = require('express')
  , router = express.Router();

// Contact brands page
router.get('/cloudant', function(req, res) {

    // Load the Cloudant library. 
    var Cloudant = require('cloudant');
    
    var me = '8ab6ba0f-22c2-4ae8-ab71-4ac8a0d4df9d-bluemix'; // Set this to your own account 
    var password = '24b5a936ed6412f55c614e6409cfea889ef0322a5dafab1017ac218706088f0f';
    
    // Initialize the library with my account. 
    var cloudant = Cloudant({account:me, password:password});

    // Specify the database we are going to use (alice)... 
    var weather = cloudant.db.use('weather')

    weather.get("london", function(err, body, header) {
    if (err) {
        return console.log('[weather.get] ', err.message);
    }
    res.render("cloudant", { encodedJson : encodeURIComponent(JSON.stringify(body.Time)) })
    });
});

module.exports = router;