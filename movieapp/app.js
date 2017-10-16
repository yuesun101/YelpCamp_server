var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('search');
});


app.get('/results', function(req,res){
    var newMovie = req.query.search;
    var url = 'http://www.omdbapi.com/?s=' + newMovie + '&apikey=thewdb';
    request(url, function(error, response, body){
        if (!error && response.statusCode == 200){
            var data = JSON.parse(body);
            // res.send(data);
            res.render('results', {results: data})
        };
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server is running'); 
});