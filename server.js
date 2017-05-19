//require the express nodejs module - agh! boo
// small change testfff
var express = require('express'),
	//set an instance of exress
	app = express(),
	//require the body-parser nodejs module
	bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path");

app.use('/', require('./controllers/contact'));
app.use('/', require('./controllers/about'));
app.use('/', require('./controllers/index'));
app.use('/', require('./controllers/gettransaction'));
app.use('/', require('./controllers/cloudant'));
app.use('/', require('./controllers/weather'));

//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');
	
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })); 

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

//tell express what to do when the /form route is requested
app.post('/form',function(req, res){
	res.setHeader('Content-Type', 'application/json');

	var openwhisk = require('openwhisk');

	var options = { 
        api: 'https://openwhisk.ng.bluemix.net/api/v1/', 
        namespace: 'CSC-BIAN-PNC_Dev',
        api_key: '02bbff7a-e3d1-4a3d-b415-677b460dcea4:vd5x8swlYCXPDk99EhFTC7aJDy9cvnsaVDcH0IdA8wtfCISDL9JhnTLtWiOlXz7i'
	};

	var ow = openwhisk(options);

	const name = 'getbalance';
	const blocking = true;
	var params = {accountnumber : req.body.accountnumber, coid : req.body.coid, accounttype : req.body.accounttype};

	ow.actions.invoke({name, blocking, params}).then(result => {
		console.log("Start of response ---");
		console.log("This is result.response ---");
		console.log(result.response);
		res.send(JSON.stringify({
			availablebalance: result.response.result.msg.availablebalance || null,
			accounttype: req.body.accounttype || null,
			coid: req.body.coid || null,
			returnedmsg: JSON.stringify(result.response.result.msg) || null
		}));
	}).catch(err => {
		console.error('failed to invoke actions', err);
	})

	ow.actions.invoke({
       name: 'Bluemix_Message Hub-pnc_Credentials-1/messageHubProduce',
       params: {
           topic: 'pnc-bian',
           value: 'Test Message from rob',
           blocking: true
       }
    });

});

//tell express what to do when the /form route is requested
app.post('/gettransaction',function(req, res){
	res.setHeader('Content-Type', 'application/json');

	var openwhisk = require('openwhisk');

	var options = { 
        api: 'https://openwhisk.ng.bluemix.net/api/v1/', 
        namespace: 'CSC-BIAN-PNC_Dev',
        api_key: '02bbff7a-e3d1-4a3d-b415-677b460dcea4:vd5x8swlYCXPDk99EhFTC7aJDy9cvnsaVDcH0IdA8wtfCISDL9JhnTLtWiOlXz7i'
	};

	var ow = openwhisk(options);

	const name = 'getTransactions';
	const blocking = true;
	var params = {accountnumber : req.body.accountnumber, coid : req.body.coid, accounttype : req.body.accounttype, 
		fromdate : req.body.fromdate, todate : req.body.todate, offset : req.body.offset,
		limit : req.body.limit, fromamount : req.body.fromamount, toamount : req.body.toamount};

	console.log(params);

	ow.actions.invoke({name, blocking, params}).then(result => {
		res.send(JSON.stringify({
			availablebalance: result.response.result.msg.availablebalance || null,
			accounttype: req.body.accounttype || null,
			coid: req.body.coid || null,
			returnedmsg: JSON.stringify(result.response.result.msg) || null
		}));
	}).catch(err => {
		console.error('failed to invoke actions', err);
	})

	ow.actions.invoke({
       name: 'Bluemix_Message Hub-pnc_Credentials-1/messageHubProduce',
       params: {
           topic: 'pnc-bian',
           value: 'Test Message from rob',
           blocking: true
       }
    });

});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});