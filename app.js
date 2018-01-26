var express = require("express");
var app = express();

app.set("view engine", "ejs");

// Routes
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        { title: "Durban central park", image: "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg"},
        { title: "Johannesburg urban camp", image: "http://www.nationalparks.nsw.gov.au/~/media/45A30E448BED4691A5E6F0553EE023B5.ashx"},
        { title: "Capetown seaside campground", image: "https://i.pinimg.com/originals/ab/5e/c4/ab5ec4ff722b1f65b855af71ba78c6fc.jpg"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds});
});

// Start server
app.listen(3000, function(){
    console.log("yelp-camp server started");
});