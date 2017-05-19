var express = require('express')
  , router = express.Router();
const https = require('https');
var temp;

// Contact brands page
router.get('/weather', function(req, res) {

 https.get('https://d077538f-d9b8-4422-8fcd-3209b6ded1c1:wZ4fRVEaG8@twcservice.eu-gb.mybluemix.net:443/api/weather/v1/geocode/52.63/1.297/observations.json?units=m&language=en-US', (resp) => {
    resp.on('data', (d) => {
      var parsed = JSON.parse(d);
      res.render('weather', { temp: parsed.observation.temp, observation: parsed.observation.wx_phrase, icon: parsed.observation.wx_icon, feels: parsed.observation.feels_like});
    });
  }).on('error', (e) => {
    console.error(e);
  });
});

module.exports = router;