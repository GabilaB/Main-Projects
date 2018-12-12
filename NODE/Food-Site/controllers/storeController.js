const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {
  res.render("index");
};

exports.addStore = (req, res) => {
  res.render("editStore", { title: "Add Store" });
};

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save();
  req.flash(
    "success",
    `Successfully Created ${store.name}. Care to leave a review`
  );
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  //Query DB for al stores

  const stores = await Store.find();
  console.log(stores);
  res.render("stores", { title: "Stores", stores });
};

exports.editStore = async (req, res) => {
  //Find the stores by ID
  const store = await Store.findOne({ _id: req.params.id });
  res.render("editStore", { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return new stores instead of old one
    runValidators: true
  }).exec();
  req.flash(
    "success",
    `Successfully Updated <strong>${store.name}</strong> 
    <a href="/stores/${store.slug}">. View Store </a>`
  );
  res.redirect(`/stores/${store._id}/edit`);
};
