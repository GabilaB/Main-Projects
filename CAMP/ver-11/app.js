var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  flash = require("connect-flash"),
  seedDB = require("./seed");

// =============================================
//Require routes
//===============================================

var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  authRoutes = require("./routes/index");

//seedDB();  //Seed the db

mongoose.connect("mongodb://localhost/CAMP");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// =============================================
//Reuire all iimported routes
//===============================================

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(8080, "localhost", function() {
  console.log("Blog Server launched");
});

// LOAD UP MONGOD
// "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"

//and the MONGO
// "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"

//then fire on
