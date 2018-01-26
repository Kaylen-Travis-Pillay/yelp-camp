var express = require("express");
var app = express();

app.set("view engine", "ejs");

// Routes
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds");
});

// Start server
app.listen(3000, function(){
    console.log("yelp-camp server started");
});