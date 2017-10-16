var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost/blogapp", {useMongoClient: true});



var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('blog_app',blogSchema);

//RESTFUL routs
app.get('/',function(req,res){
    res.redirect('/blogs');
});

//index
app.get('/blogs',function(req,res){
    Blog.find({},function(err,blogs){
        if (err){
            console.log('ERROR!')
        } else{
            res.render('index', {blogs: blogs})
        }
    });
});

//new
app.get('/blogs/new', function(req, res){
    res.render('new');
});

//created
app.post('/blogs', function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if (err){
            res.render('new')
        } else{
            res.redirect('blogs')
        }
    })
});

//show
app.get('/blogs/:id', function(req,res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if (err){
            res.render('index')
        } else{
            res.render('show', {blog: foundBlog})
        }
    });
});

//edit
app.get('/blogs/:id/edit', function(req,res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if (err){
            res.render('index')
        } else{
            res.render('edit', {blog: foundBlog})
        }
    });
});

//update
app.put('/blogs/:id', function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateblog){
        if (err){
            res.redirect('/blogs');
        } else{
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

//delete
app.delete('/blogs/:id', function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if (err){
            res.redirect('/blogs');
        } else{
            res.redirect('/blogs');
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server is running'); 
});
