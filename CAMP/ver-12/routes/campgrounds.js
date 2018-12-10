var express = require("express"),
  middleware = require("../middleware/index"),
  Campground = require("../models/campground");
router = express.Router();

router.get("/", function(req, res) {
  // res.render("campgrounds", { campgrounds: campgrounds });

  // Get all camps from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds
      });
    }
  });
});

// CREATE - add new camp
router.post("/", middleware.isLoggedIn, function(req, res) {
  //get DatA and add to campground array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };

  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };

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

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
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

// EDIT CAMPGROUND ROUTWE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(
  req,
  res
) {
  //check if user is logged in and own campground
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE CAMPGROUND ROUTWE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  //find and update the correct Campground

  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DELETE CAMPGROUNDS
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//MIDDLEWARE

module.exports = router;
