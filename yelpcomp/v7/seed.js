var mongoose = require('mongoose');
var CampGround = require('./models/campground');
var Comment = require('./models/comment');

var data = [
        {name: 'Boston', image:'https://farm1.staticflickr.com/74/180338316_11c27993bb.jpg', description:'Great picture with good depth of field good lighting and a clear focus.'},
        {name: 'Boston', image:'https://farm1.staticflickr.com/74/180338316_11c27993bb.jpg', description:'Great picture with good depth of field good lighting and a clear focus.'},
        {name: 'Boston', image:'https://farm1.staticflickr.com/74/180338316_11c27993bb.jpg', description:'Great picture with good depth of field good lighting and a clear focus.'} 
    ]

function seedDB(){
    //Remove all campgrounds
    CampGround.remove({}, function(err){
        if (err){
            console.log(err);
        }
        data.forEach(function(seed){
           CampGround.create(seed,function(err,campgrpund){
              if (err){
                  console.log(err);
              } else{
                  console.log('added a campground');
                  
                  //Comment
                  Comment.create({
                      text: 'This place is great, but wifi is slow.',
                      author: 'Homer'
                  },function(err,comment){
                     if (err){
                         console.log(err);
                     } else{
                         campgrpund.comments.push(comment);
                         campgrpund.save();
                         console.log('new common added');
                     }
                  });
              }
           });
        });
    })
};

module.exports = seedDB;