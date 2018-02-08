var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seed_db = require("./db_seed/seeds");

// Seeding the database
seed_db();

// Models for MongoDB used in yelp-camp
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
// ============================================================== //

// App config
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", function(req, res){
    res.render("landing");
});

// RESTful Route -> INDEX: lists all the campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from the database
    Campground.find({}, function(err, campgrounds) {
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.render("index", { campgrounds: campgrounds });
        }
    });
    
});

// RESTful Route -> CREATE: Creates a campground and redirects to the INDEX route
app.post("/campgrounds", function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var descr = req.body.descr;
    var new_campground = {
        title: title,
        image: image,
        description: descr
    };

    Campground.create(new_campground, function(err, campground){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

// RESTful Route -> NEW: Displays the form for creating a campground
app.get("/campgrounds/new", function(req, res){
    res.render("new_campground");
});

// RESTful Route -> SHOW: Shows a single campground based on id param
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log("Error: ", err);
        }else{
            res.render("show", {campground: campground});
        }
    });
});

// =====================
// Comments ROUTE
// =====================
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment._id);
                    campground.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("/campgrounds/" + campground._id);
                        }
                    });
                }
            });
        }
    });
});

// Start server on local machine
app.listen(3000, function(){
    console.log("yelp-camp server started");
});

// // Starting server on c9.io
// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("yelp-camp server has started"); 
// });