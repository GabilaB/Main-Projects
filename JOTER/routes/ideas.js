const express = require("express");
const router = express.Router();
// const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../helpers/auth");

// Load Idea Model
require("../models/Idea");
const Idea = mongoose.model("ideas");

//Idea index page
router.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({ user: req.user.id }) // logs each user to their specific page.
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

// ADD IDEA FORM
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("ideas/add"); // since it is already in views, we look into the ideas and find the handlebar
});

// EDIT IDEA FORM
router.get("/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    if (idea.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      res.redirect("/ideas");
    } else {
      res.render("ideas/edit", {
        idea: idea
      });
    }
  });
  // since it is already in views, we look into the ideas and find the handlebar
});

// Process Form
router.post("/", ensureAuthenticated, (req, res) => {
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
      details: req.body.details,
      user: req.user.id
    };
    new Idea(newUser).save().then(idea => {
      req.flash("success_msg", "Successfully saved your Idea");
      res.redirect("/ideas");
    });
  }
});

// EDIT FORM PROCESS
router.put("/:id", ensureAuthenticated, (req, res) => {
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

// Delete Idea
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Idea removed from our DB");
    res.redirect("/ideas");
  });
});

module.exports = router;
