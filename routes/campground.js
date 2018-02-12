/** 
 * This file contains the RESTful Routes used for the campgrounds.
 * The campground model can be found under /models/campgrounds and
 * all db transactions require this.
*/

var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");

// RESTful Route -> INDEX: lists all the campgrounds
router.get("/", function (req, res) {
    
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("index", { campgrounds: campgrounds });
        }
    });

});

// RESTful Route -> CREATE: Creates a campground and redirects to the INDEX route
router.post("/", function (req, res) {
    
    var title = req.body.title;
    var image = req.body.image;
    var descr = req.body.descr;
    var new_campground = {
        title: title,
        image: image,
        description: descr
    };

    Campground.create(new_campground, function (err, campground) {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/campgrounds");
        }
    });

});

// RESTful Route -> NEW: Displays the form for creating a campground
router.get("/new", function (req, res) {
    
    res.render("new_campground");

});

// RESTful Route -> SHOW: Shows a single campground based on id param
router.get("/:id", function (req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log("Error: ", err);
        } else {
            res.render("show", { campground: campground });
        }
    });
    
});

module.exports = router;