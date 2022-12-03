var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')
var app  = express();
var port = process.env.PORT || 6969;


// Database
var Database = require('./libs/db/db.js');
var db = new Database();  // raw db access
var db_interface = require('./libs/db/interface.js');  // abstracted access like db_interface.signup.signup(req, res)
var db_signup = new db_interface.Signup(db);

// Middleware
app.use(express.static(path.join(__dirname, 'Public', 'scripts')));
app.use(express.json())
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('Public'))
app.use(express.urlencoded({ extended: true }));


/*
 *	PAGES
 */
app.get('/', function (req, res, next) {
	if (req)
	{
		res.status(200).render('mainmap', {
			helpers: {
				foo() {	return 'foo.';	}
			}
		});
		/*res.status(200).sendFile(path.join(__dirname, '/Public/index.html'))*/
	}
	else
	{
		next();
	}
});

app.get('/leaderboard', function (req, res) {
	res.status(200).render('leaderboard');
});

app.get('/signin', function (req, res) {
	res.status(200).render('signin');
});


app.get('/shrek', function(req, res){
	res.status(200).render('profile');
});

/*
 *	ACTIONS
 */

app.post('/users/signup', (req, res) => {
	// req is a form submission
	console.log('== POST /users/signup ==');
	console.log(JSON.stringify(req.body));
	let result = db_signup.signup(req);
	console.log(result);
	let success = result[0];
	let message = result[1];
	if (success) {
		console.log('Signup successful.');
		res.status(200).send(JSON.stringify({
			success: true,
			message: message
		}));
	} else {
		console.log('Signup failed: ' + message);
		res.status(400).send(JSON.stringify({
			success: false,
			message: message
		}));
	}
});

app.post('/users/login', (req, res) => {
	let result = db_signup.login(req);
	let success = result[0];
	let message = result[1];
	if (success) {
		res.status(200).send(JSON.stringify({
			success: true,
			message: message
		}));
	} else {
		res.status(400).send(JSON.stringify({
			success: false,
			error: message
		}));
	}
});

app.post('/users/signup/check', (req, res) => {
	// req is an object with a username and email property
	let result = db_signup.check_signup(req);
	let email_in_use = result[0];
	let username_in_use = result[1];
	res.status(200).send(JSON.stringify({
		email_in_use: email_in_use,
		username_in_use: username_in_use
	}));
});

app.post('/users/login/check', (req, res) => {
	// req is an object with a username and password property
	let result = db_signup.check_login(req);
	let success = result[0];
	let message = result[1];
	if (success) {
		res.status(200).send(JSON.stringify({
			success: true,
			message: message
		}));
	} else {
		res.status(400).send(JSON.stringify({
			success: false,
			error: message
		}));
	}
});

app.get('*', function (req, res) {
	res.status(404).render('404', {url: req.url});
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});


