var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "banga",
    image:
      "https://images.pexels.com/photos/959252/dramatic-clouds-sky-drama-959252.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "Keep working hard Gbais hashha hahshaha hahsha asx"
  },
  {
    name: "AMPAR",
    image:
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "Keep working hard Gbais hashha hahshaha hahsha asx"
  },
  {
    name: "STREG",
    image:
      "https://images.pexels.com/photos/1612841/pexels-photo-1612841.jpeg?auto=compress&cs=tinysrgb&h=350",
    description: "Keep working hard Gbais hashha hahshaha hahsha asx"
  }
];

function seedDB() {
  //REMOVE CAMPS
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed");
    }
    //ADD CAMPS
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("ADDED");
          //CREATE COMMENT
          Comment.create(
            {
              text: "them mama",
              author: "gabs"
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created comment");
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
