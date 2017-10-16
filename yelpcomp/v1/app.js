var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

var campgrounds = [
    {name:'Grand Hill', image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
    {name:'Malden Hill', image: 'https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg'},
    {name:'Allston Hill', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
    {name:'Boston Hill', image: 'https://farm3.staticflickr.com/2919/14554501150_8538af1b56.jpg'}
]


//landing page
app.get('/', function(req,res){
    res.render('landing');
});

app.get('/campground',function(req,res){
    res.render('campground', {campgrounds: campgrounds});
});

app.post('/campground', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect('/campground');
});


app.get('/campground/new',function(req,res){
    res.render('new');
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The YelpCamp server is running'); 
});