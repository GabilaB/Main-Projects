if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: "mongodb://<gabis>:<water1>@ds253094.mlab.com:53094/joter-k"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost:27017/joters" };
}
