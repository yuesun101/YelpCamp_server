var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require('../models/user');

//landing page
router.get('/', function(req,res){
    res.render('landing');
});

//==============================
//register
router.get('/register', function(req,res){
   res.render('register');
});

router.post('/register', function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,function(){
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
           res.redirect('campground'); 
        });
    });
});

//login
router.get('/login', function(req,res){
    res.render('login');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campground',
        failureRedirect: '/login'
    }),function(req,res){
        
});


//logout
router.get('/logout', function(req,res){
   req.logout();
   req.flash('success', 'Logged you out!')
   res.redirect('/campground');
});


//medware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;