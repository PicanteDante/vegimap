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


/*
 *	ACTIONS
 */


app.post('/users/signup/', function (req, res) {
	// req is a form submission
	console.log("== Signup request ==");
	console.log(JSON.stringify({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}));
	db_signup.signup(req, res);
});

app.post('/users/login/', function (req, res) {
	// req is a form submission
	console.log("== Login request ==");
	console.log(JSON.stringify({
		email: req.body.email,
		password: req.body.password
	}));
	db_signup.login(req, res);
	//res.redirect('/');
});


app.get('*', function (req, res) {
	res.status(404).render('404', {url: req.url});
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});


