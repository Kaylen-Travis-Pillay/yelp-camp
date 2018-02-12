var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var isLoggedIn = require("../middleware/auth_middleware");

// RESTful Route: NEW -> shows the new comment form
router.get("/new", isLoggedIn, function (req, res) {
    
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });

});

// RESTful Route: CREATE -> creates the comment and redirects to the campground show page
router.post("/", isLoggedIn, function (req, res) {
    
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment._id);
                    campground.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect("/campgrounds/" + campground._id);
                        }
                    });
                }
            });
        }
    });

});

module.exports = router;