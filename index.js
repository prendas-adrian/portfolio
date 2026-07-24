var express = require('express')
var app = express()
var path = require('path')

app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/animation', express.static(__dirname + '/animation'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
	
    
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})