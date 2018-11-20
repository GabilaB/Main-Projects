var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express();

mongoose.connect;
mongoose.connect("mongodb://localhost/BLOG");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose/Model Config

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFul Routes

app.get("/", function(req, res) {
  res.redirect("/blogs");
});

//INDEX ROUTE

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("err");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//NEW ROUTE
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
  //create blog
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      //then, redirect to the index page
      res.redirect("/blogs");
    }
  });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});
app.listen(1010, "localhost", function() {
  console.log("Blog Server launched");
});

// LOAD UP MONGOD
// "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"

//and the MONGO
// "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"

//then fire on
