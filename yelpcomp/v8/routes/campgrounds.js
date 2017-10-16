var express = require('express');
var router = express.Router();
var CampGround = require('../models/campground');
var Comment = require('../models/comment');


//Index
router.get('/campground',function(req,res){
    CampGround.find({},function(err,campgrounds){
        if (err){
            console.log('There were something went wrong');
        }else{
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

router.post('/campground', isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, image:image, description:des, author:author};
    console.log(newCampground);
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
router.get('/campground/new', isLoggedIn,function(req,res){
    res.render('campgrounds/new');
});

//Show
router.get('/campground/:id',function(req,res){
    CampGround.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else{
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;