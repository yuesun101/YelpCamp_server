//require lib
var express     =   require('express'),
    app         =   express(),
    bodyparser  =   require('body-parser'),
    mongoose    =   require('mongoose'),
    seedDB      =   require('./seed'),
    methodOverride = require('method-override'),
    flash       = require('connect-flash')

//require models
var CampGround  =   require('./models/campground'),
    Comment     =   require('./models/comment'),
    User        =   require('./models/user')

//require auth
var passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

//require routes
var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index')

mongoose.connect("mongodb://localhost/yelp_camp");
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

// seed the server
// seedDB();

//passport configuration
app.use(require('express-session')({
    secret: 'This is for test',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The YelpCamp server is running'); 
});