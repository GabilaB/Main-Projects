var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aso-2");

// POST - email, name

var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var Post = mongoose.model("Post", postSchema);
// USER - email, name

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//   email: "MAPOO@gab.com",
//   name: "ALL TIN NA MILK"
// });

// newUser.posts.push({
//   title: "Brewing Beer",
//   content: "CORN MILLET FACTORY WATER"
// });

// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// var newPost = new Post({
//   title: "From me",
//   content: "to you and back and forth to them too"
// });

// newPost.save(function(err, post) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({ name: "ALL TIN NA MILK" }, function(err, user) {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: "Brewing Beer-----------2",
      content:
        "CORN MILLET FACTORY WATER CORN MILLET FACTORY WATERCORN MILLET FACTORY WATER"
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
