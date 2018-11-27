var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user");
seedDB = require("./seed");

// =============================================
// ROUTES CONNECT
//===============================================
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

seedDB();
mongoose.connect("mongodb://localhost/CAMP");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// =============================================
// PASSPORT CONFIG
//===============================================
app.use(
  require("express-session")({
    secret: "camp-app",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =============================================
// PASSPORT CONFIG END
//===============================================

// =============================================
// MIddleWare to call/use currentUser on all pages
//===============================================
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// =============================================
// USE ROUTES
//===============================================
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

// =============================================
// PLUG
//===============================================

app.listen(1010, "localhost", function() {
  console.log("Blog Server launched");
});

// LOAD UP MONGOD
// "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"

//and the MONGO
// "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"

//then fire on
