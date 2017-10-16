var express = require('express');
var router = express.Router();
var CampGround = require('../models/campground');
var Comment = require('../models/comment');

//============================
//Comments routs
router.get('/campground/:id/comments/new', isLoggedIn, function(req,res){
    CampGround.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else{
            res.render('comments/new', {campground: campground}); 
        }
    })
});


router.post('/campground/:id/comments',isLoggedIn, function(req,res){
    CampGround.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campground/' + campground._id);
                }
            })
        }
        
    })
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;