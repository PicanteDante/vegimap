var path = require('path');
var express = require('express');

var app  = express();
var port = process.env.PORT || 6969;

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', function (req,res) {
    res.status(200).sendFile(path.join(__dirname, '/Public/index.html'))
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
    console.log("== Server is listening on port", port);
});