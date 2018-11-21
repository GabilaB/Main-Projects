var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
  {
    name: "gabis",
    image:
      "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    name: "banga",
    image:
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    name: "banga",
    image:
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    name: "banga",
    image:
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    name: "banga",
    image:
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    name: "tohtoh",
    image:
      "https://images.pexels.com/photos/972990/pexels-photo-972990.jpeg?auto=compress&cs=tinysrgb&h=350"
  }
];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
  //get DatA and add to campground array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  //redirect to camp site
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.listen(1010, "localhost", function() {
  console.log("Blog Server launched");
});
