var mongoose = require("mongoose"),
  Post = require("./models/post"),
  User = require("./models/user");

mongoose.connect("mongodb://localhost/aso-demo-2");

// POST - email, name

// USER - email, name

// User.create({
//   email: "gabs@me.you",
//   name: "gabs for life"
// });

Post.create(
  {
    title: "How to cook ekwang and NDOLEEEEEE-----------8",
    content: "PLANTY PLANTY PPLANTY PLANTY PLANTY PLANTY PLANTY PLNATY"
  },
  function(err, post) {
    User.findOne(
      {
        email: "gabs@me.you"
      },
      function(err, foundUser) {
        if (err) {
          console.log(err);
        } else {
          foundUser.posts.push(post);
          foundUser.save(function(err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          });
        }
      }
    );
  }
);

// User.findOne({ email: "gabs@me.you" })
//   .populate("posts")
//   .exec(function(err, user) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(user);
//     }
//   });
