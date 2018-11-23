var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/Authen");
app.set("view engine", "ejs");

app.use(
  require("express-session")({
    secret: "all tin fine",
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.urlencoded({ extended: true })); //mainly for forms postings
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + "/public"));

//===========================
// ROUTES
//============================

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
  res.render("secret");
});

// AUTH TOUTES
app.get("/register", function(req, res) {
  res.render("register");
});

//handling user sign up

app.post("/register", function(req, res) {
  req.body.username;
  req.body.password;
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/secret");
        });
      }
    }
  );
});

// LOGIN ROUTES

//render login form
app.get("/login", function(req, res) {
  res.render("login");
});

//LOGIN LOGIC

app.post(
  "/login",

  //use of middleware
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//LOGOUT LOGIC

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// IS LOGGED IN

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(1010, "localhost", function() {
  console.log("Blog Server launched");
});

// LOAD UP MONGOD
// "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"

//and the MONGO
// "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"

//then fire on
