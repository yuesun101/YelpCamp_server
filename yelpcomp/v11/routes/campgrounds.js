var express = require('express');
var router = express.Router();
var CampGround = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');


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

router.post('/campground', middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var des = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name,price:price, image:image, description:des, author:author};
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
router.get('/campground/new', middleware.isLoggedIn,function(req,res){
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

//edit
router.get('/campground/:id/edit', middleware.checkCampgroundOwbership , function(req, res){
    CampGround.findById(req.params.id, function(err, foundCampground){
        if (err){
            res.redirect('/campgrpund');
        } else{
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    })
});



//update
router.put('/campground/:id', middleware.checkCampgroundOwbership ,function(req,res){
   CampGround.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
      if (err){
          res.redirect('/campground');
      } else{
          res.redirect('/campground/' + req.params.id);
      }
   });
});

//destroy
router.delete('/campground/:id', middleware.checkCampgroundOwbership ,function(req,res){
    CampGround.findByIdAndRemove(req.params.id, function(err){
       if (err){
           res.redirect('/campground');
       } else{
           req.flash('success', 'Campground deleted');
           res.redirect('/campground');
       }
    });
});


module.exports = router;