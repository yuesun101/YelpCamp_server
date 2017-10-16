var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

//create mongo schema
var campSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var CampGround = mongoose.model('CampGround',campSchema);


// CampGround.create(
//     {
//         name: 'Boston',
//         image: 'https://farm1.staticflickr.com/74/180338316_11c27993bb.jpg',
//         description:'Trees, gravel road, sunlight, and a car. Wonderful combination.'
//     }
//     , function(err,campground){
//     if (err){
//         console.log('There were something went wrong');
//     }else{
//         console.log('A campground has beem added');
//     }
// });


//landing page
app.get('/', function(req,res){
    res.render('landing');
});

//All campground
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


app.get('/campground/new',function(req,res){
    res.render('new');
});

app.get('/campground/:id',function(req,res){
    CampGround.findById(req.params.id, function(err, foundCampground){
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