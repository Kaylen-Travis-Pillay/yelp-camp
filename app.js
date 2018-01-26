var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.send("Root directory reached");
});

app.listen(3000, function(){
    console.log("yelp-camp server started");
});