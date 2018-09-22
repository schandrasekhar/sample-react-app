var express = require('express');
var port = 3000;
var app = express();

//to serve static files
app.use(express.static(__dirname + '/build/'));

app.get('/', function(req, res) {
    var options = {
        root: __dirname + '/build/'
    };
    res.sendFile('index.html', options);
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
