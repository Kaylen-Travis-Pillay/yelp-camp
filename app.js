var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Schema setup, TODO: Refactor this later
var campgroundSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});

// Model setup, TODO: Refactor this later
var Campground = mongoose.model("Campground", campgroundSchema);

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
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("Error: ", err);
        }else{
            res.render("show", {campground: campground});
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