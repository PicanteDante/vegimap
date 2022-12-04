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

// Currently redirects /shrek (only current profile) to /profile
app.get('/shrek', function(req, res){
	res.status(200).render('profile');
});

app.get('/about', function(req, res){
	res.status(200).render('about');
});


//#region API
//#region Signup

/**
 * @api {post} /api/register Register a new user
 * @apiName Register
 * @apiGroup Signup
 * 
 * @apiParam {String} username Username
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {String} token User token
 * 
 * @apiError {String} message Error message
 */
app.post('/api/register', (req, res) => {
	let result = db_signup.register(req);
	if (result[0]) {
		res.status(200).send(JSON.stringify({
			message: 'Successfully registered.',
			token: result[1]
		}));
	} else {
		res.status(400).send(JSON.stringify({
			message: result[1]
		}));
	}
});

/**
 * @api {post} /api/login Login
 * @apiName Login
 * @apiGroup Signup
 * 
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 * 
 * @apiSuccess {String} message Success message
 * @apiSuccess {String} token User token
 * 
 * @apiError {String} message Error message
 */
app.post('/api/login', (req, res) => {
	let result = db_signup.login(req);
	if (result[0]) {
		res.status(200).send(JSON.stringify({
			message: 'Successfully logged in.',
			token: result[1]
		}));
	} else {
		res.status(400).send(JSON.stringify({
			message: result[1]
		}));
	}
});
//#endregion

//#endregion

app.get('*', function (req, res) {
	res.status(404).render('404', {url: req.url});
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});


