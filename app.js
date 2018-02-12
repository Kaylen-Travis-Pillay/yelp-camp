var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express_session = require("express-session");
var passport = require("passport");
var passport_local = require("passport-local");
var passport_local_mongoose = require("passport-local-mongoose");
var seed_db = require("./db_seed/seeds");

// Seeding the database
seed_db();

// Models for MongoDB used in yelp-camp
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var User = require("./models/users");

// Routes
var campground_routes = require("./routes/campground");
var comment_routes = require("./routes/comment");
var index_routes = require("./routes/index");
// ============================================================== //

// App config
mongoose.connect("mongodb://localhost/yelp_camp_v4");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express_session({
    secret: "thiisiistthesseccreettethatisusedforsessionencryption",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passport_local(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds", campground_routes);
app.use("/campgrounds/:id/comments", comment_routes);
app.use("/", index_routes);

// Start server on local machine
app.listen(3000, function(){
    console.log("yelp-camp server started");
});

// // Starting server on c9.io
// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("yelp-camp server has started"); 
// });