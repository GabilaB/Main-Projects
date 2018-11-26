var mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose.connect("mongodb://localhost/Authen-2");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});

app.listen(1010, "localhost", function() {
  console.log("Blog Server launched");
});
