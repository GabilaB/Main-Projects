var express = require("express"),
  passport = require("passport"),
  User = require("../models/user");
router = express.Router();

// =============================================
// AUTH ROUTES
//===============================================

//SHOW REGISTER FORM
router.get("/", function(req, res) {
  res.render("landing");
});

router.get("/register", function(req, res) {
  res.render("register");
});

// HANDLE SIGN UP LOGIC
router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res) {
  res.render("login", { message: req.flash("error") });
});

//HANDLING LOGIN LOGIC
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
