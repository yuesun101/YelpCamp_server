var CampGround = require('../models/campground'),
    Comment = require('../models/comment')

//all middleware goes there
var middlewareObj = {};

middlewareObj.checkCampgroundOwbership = function(req, res, next){
    if (req.isAuthenticated()){
        CampGround.findById(req.params.id, function(err, foundCampground){
            if (err){
                res.redirect('back');
            } else{
                //does the user own the campground?
                if (foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect('back'); 
                }
            }
        });
    } else{
        res.redirect('back');
    } 
};

middlewareObj.checkCommendOwbership = function checkCommendOwbership(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                res.redirect('back');
            } else{
                //does the user own the campground?
                if (foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect('back'); 
                }
            }
        });
    } else{
        res.redirect('back');
    }  
};

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = middlewareObj;