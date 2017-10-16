var express = require("express");
var app = express();
var bodyparser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

var friends = ['Jerry', 'Tom', 'Lily', 'Elvis'];


// Hpme page
app.get('/',function(req,res){
   res.send('This is the home page'); 
});

// add Friends page
app.get('/friends',function(req,res){
   res.render('friends',{friends:friends}); 
});

//post new friend
app.post('/addfriend',function(req,res){
    var newfriend = req.body.newfriend;
    friends.push(newfriend);
   res.redirect('/friends'); 
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server is running'); 
});

