var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')
var app  = express();
var port = process.env.PORT || 6969;

//app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json())
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('Public'))


app.get('/', function (req, res, next) {
	if (req)
	{
		//res.status(200).sendFile(path.join(__dirname, '/Public/index.html'))
		res.status(200).render('map')
	}
	else
	{
		next();
	}
});




app.get('*', function (req, res) {
  res.status(404).render('404', {

  });
});

/*
app.get('*', function (req, res) {
    //res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    res.status(404).render('404', {
      url: req.url
    })
  });
*/

app.listen(port, function () {
	if (err){
		throw err
	}
    console.log("== Server is listening on port", port);
});
