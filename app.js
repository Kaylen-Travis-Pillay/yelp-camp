var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/yelpCampDB");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var campgrounds = [
    { title: "Durban", image: "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg" },
    { title: "Johannesburg", image: "http://www.nationalparks.nsw.gov.au/~/media/45A30E448BED4691A5E6F0553EE023B5.ashx" },
    { title: "Capetown", image: "https://i.pinimg.com/originals/ab/5e/c4/ab5ec4ff722b1f65b855af71ba78c6fc.jpg" }
];

// Routes
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var new_campground = {
        title: title,
        image: image
    };

    campgrounds.push(new_campground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new_campground");
});

// Start server on local machine
app.listen(3000, function(){
    console.log("yelp-camp server started");
});

// // Starting server on c9.io
// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("yelp-camp server has started"); 
// });