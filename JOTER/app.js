const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

//Map global promise -- get rid of warning
mongoose.Promise = global.Promise;
// connect to mongoose
mongoose
  .connect(
    "mongodb://localhost:27017/joters",
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Load Idea Model
require("./models/Idea");
const Idea = mongoose.model("ideas");

// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Body Parse Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// OVERride middW
app.use(methodOverride("_method"));

// Express session midW
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

// GLOBAL VARIABLES

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Index Route

app.get("/", (req, res) => {
  const title = "Welcome, start joting";
  res.render("index", {
    title: title
  });
});

// ABOUT PAGE
app.get("/about", (req, res) => {
  res.render("about");
});

// Idea index page
app.get("/ideas", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

// ADD IDEA FORM
app.get("/ideas/add", (req, res) => {
  res.render("ideas/add"); // since it is already in views, we look into the ideas and find the handlebar
});

// EDIT IDEA FORM
app.get("/ideas/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render("ideas/edit", {
      idea: idea
    });
  });
  // since it is already in views, we look into the ideas and find the handlebar
});

// Process Form
app.post("/ideas", (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }

  if (errors.length > 0) {
    res.render("ideas/add", {
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser).save().then(idea => {
      req.flash("success_msg", "Successfully saved your Idea");
      res.redirect("/ideas");
    });
  }
});

// EDIT FORM PROCESS
app.put("/ideas/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    //new values
    (idea.title = req.body.title), (idea.details = req.body.details);

    idea.save().then(idea => {
      req.flash("success_msg", "Successfully updated your Idea");
      res.redirect("/ideas");
    });
  });
});

// Delete
app.delete("/ideas/:id", (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Idea removed from our DB");
    res.redirect("/ideas");
  });
});

const port = 5000;
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
