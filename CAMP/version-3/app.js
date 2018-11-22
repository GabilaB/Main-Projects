var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seed");

seedDB();
mongoose.connect("mongodb://localhost/CAMP");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SET UP

// Campground.create(
//   {
//     name: "banga",
//     image:
//       "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&h=350",
//     description: "Keep working hard Gbais"
//   },
//   function(err, campground) {
//     if (err) {
//       console.log("err");
//     } else {
//       console.log("newly created");
//       console.log("campground");
//     }
//   }
// );

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  // res.render("campgrounds", { campgrounds: campgrounds });

  // Get all camps from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function(req, res) {
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

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// Shows info about one campground
app.get("/campgrounds/:id", function(req, res) {
  //find the Campground by ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //Find campground with provided ID
        res.render("show", { campground: foundCampground });
      }
    });
});

app.listen(1010, "localhost", function() {
  console.log("Blog Server launched");
});
