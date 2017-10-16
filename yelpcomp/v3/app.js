var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var CampGround = require('./models/campground');
var seedDB = require('./seed');
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

seedDB();

//landing page
app.get('/', function(req,res){
    res.render('landing');
});

//Index
app.get('/campground',function(req,res){
    CampGround.find({},function(err,campgrounds){
        if (err){
            console.log('There were something went wrong');
        }else{
            res.render('index', {campgrounds: campgrounds});
        }
    });
});

app.post('/campground', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    var newCampground = {name:name, image:image, description:des};
    CampGround.create(
        newCampground
        , function(err,campground){
        if (err){
            console.log('There were something went wrong');
        }else{
            console.log('A campground has beem added');
            res.redirect('/campground')
        }
    });
    // res.redirect('/campground');
});

//Create
app.get('/campground/new',function(req,res){
    res.render('new');
});

//Show
app.get('/campground/:id',function(req,res){
    CampGround.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else{
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The YelpCamp server is running'); 
});