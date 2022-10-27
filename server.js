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


//var map = L.map('map').setView([51.505, -0.09], 13);
//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//	maxZoom: 19,
//	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);


app.get('/', function (req, res, next) {
	if (req)
	{
		res.status(200).render('mainmap')
		/*res.status(200).sendFile(path.join(__dirname, '/Public/index.html'))*/
	}
	else
	{
		next();
	}
});



app.get('*', function (req, res) {
  res.status(404).render('404', {url: req.url});
});



app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
