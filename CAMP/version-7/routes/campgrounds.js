var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - SHOW ALL CAMPS

router.get("/", function(req, res) {
  // res.render("campgrounds", { campgrounds: campgrounds });

  // Get all camps from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds,
        currentUser: req.user
      });
    }
  });
});

//CREATE NEW CAMPGROUND
router.post("/", function(req, res) {
  //get DatA and add to campground array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;

  var newCampground = { name: name, image: image, description: desc };
  // Create New Camground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect to camp site
      res.redirect("/campgrounds");
    }
  });
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", function(req, res) {
  res.render("campgrounds/new");
});

// Shows info about one campground
router.get("/:id", function(req, res) {
  //find the Campground by ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //Find campground with provided ID
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

module.exports = router;
