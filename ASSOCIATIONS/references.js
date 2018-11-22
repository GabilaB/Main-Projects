var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aso_2");

//IF EMBEDDING ANY DATA, DEFINE IT FIRST!

// POST - TILT COMMENT   -- define post FIRST since we are using it below
// var postSchema = new mongoose.Schema({
//   title: String,
//   content: String
// });
// var Post = mongoose.model("Post", postSchema);

var Post = require("./models/post");

//user - email, name

var User = require("./models/user");

// var userSchema = new mongoose.Schema({
//   email: String,
//   name: String,
//   posts: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Post"
//     }
//   ]
// });

// var User = mongoose.model("User", userSchema);

Post.create({
  title: "all tin I say na posh-------555",
  content: "hadycvaysdvch this thing happenvaysdvc",
  function(err, post) {
    User.findOne(
      {
        email: "kokobiokko@me.com"
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
});

// //FIND USER
// User.findOne({ email: "kokobiokko@me.com" })
//   .populate("posts")
//   .exec(function(err, user) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(user);
//     }
//   });

// // User.create({
//   email: "kokobiokko@me.com",
//   name: "kokothem"
// });
