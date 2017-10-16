var express = require('express');
var router = express.Router();
var CampGround = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//============================
//Comments routs
router.get('/campground/:id/comments/new', middleware.isLoggedIn, function(req,res){
    CampGround.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else{
            res.render('comments/new', {campground: campground}); 
        }
    })
});


router.post('/campground/:id/comments',middleware.isLoggedIn, function(req,res){
    CampGround.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', 'Something went wrong');
                    console.log(err);
                } else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment 
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Successfully added comment');
                    res.redirect('/campground/' + campground._id);
                }
            })
        }
        
    })
});

//edit comments
router.get('/campground/:id/comments/:comment_id/edit', middleware.checkCommendOwbership,function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else{
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    });

});

//update
router.put('/campground/:id/comments/:comment_id', middleware.checkCommendOwbership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
      if (err){
          res.redirect('back');
      } else{
          res.redirect('/campground/' + req.params.id);
      }
   });
});

//destroy
router.delete('/campground/:id/comments/:comment_id', middleware.checkCommendOwbership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if (err){
           res.redirect('back');
       } else{
           req.flash('success', 'Comment deleted');
           res.redirect('back');
       }
    });
});


module.exports = router;