const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const methodOverride = require("method-override");
// const flash = require("connect-flash");
// const session = require("express-session");

// LOAD USER MODEL
require("../models/User");
const User = mongoose.model("users");

// USER AUTH
router.get("/login", (req, res) => {
  res.render("users/login");
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

// LOGIN FORM POST
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/ideas",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// REGISTER FORM POST
router.post("/register", (req, res) => {
  let errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({ text: "Passwords do not match" });
  }

  if (req.body.password.length < 5) {
    errors.push({ text: "Password must be at least 4 characters " });
  }
  if (errors.length > 0) {
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        req.flash("error_msg", "Email already registered");
        res.redirect("/users/register");
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered, log in beauty queen!"
                );
                res.redirect("/users/login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

// LOGOUT USERS
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "you are logged out");
  res.redirect("/users/login");
});

module.exports = router;
