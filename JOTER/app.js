const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");

const app = express();

// LOAD ROUTES
const ideas = require("./routes/ideas");
const users = require("./routes/users");

// Passport Config
require("./config/passport")(passport);

// DB CONFIG

const db = require("./config/database");

//Map global promise -- get rid of warning
mongoose.Promise = global.Promise;
// connect to mongoose
mongoose
  .connect(
    db.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

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

// STatic Folder
app.use(express.static(path.join(__dirname, "public")));

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

// PAssport MidW
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// GLOBAL VARIABLES

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
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

// USE ROUTES

app.use("/ideas", ideas);
app.use("/users", users);

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
