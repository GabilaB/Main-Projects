exports.myMiddleware = (req, res, next) => {
  req.name = "gaabs";
  next();
};

exports.homePage = (req, res) => {
  res.render("index");
};
