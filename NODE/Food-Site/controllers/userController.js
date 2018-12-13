const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");

exports.loginForm = (req, res) => {
  res.render("login", { title: "Login Form" });
};

exports.registerForm = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("name", "You must supply a name").notEmpty();
  req.checkBody("email", " That Email is not valid").isEmail();
  req.sanitizeBody("mail").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  req.checkBody("password", "Password cannot be Blank!").notEmpty();
  req
    .checkBody("password-confirm", "Confirm Password cannot be Blank!")
    .notEmpty();
  req
    .checkBody("password-confirm", "Oops.. Passwords do not match")
    .equals(req.body.password);

  const error = req.validationErrors();
  if (error) {
    req.flash("error", error.map(err => err.msg));
    res.render("register", {
      title: "Register",
      body: req.body,
      flashes: req.flash()
    });
    return; //stops function from running
  }
  next(); // move to next order
};

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next(); // pass to controller.js
};
