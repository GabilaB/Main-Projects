var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aso");

//IF EMBEDDING ANY DATA, DEFINE IT FIRST!

// POST - TILT COMMENT   -- define post FIRST since we are using it below
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model("Post", postSchema);

//user - email, name

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//   email: "popolipopo@me.com",
//   name: "popoli"
// });

// newUser.posts.push({
//   title: "all tin I say na posh",
//   content: "make this thing happen"
// });

// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// var newPost = new Post({
//   title: "all tin na milk",
//   content: "Drink as much as you fit"
// });

// newPost.save(function(err, post) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({ name: "popoli" }, function(err, user) {
  if (err) {
    console.log("");
  } else {
    user.posts.push({
      title: "another thing",
      content: "them mamamamamamama"
    });
    user.save(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
