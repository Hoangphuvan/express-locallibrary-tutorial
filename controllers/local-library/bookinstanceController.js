const Bookinstance = require("../../models/local-library/bookinstance");
const asyncHandler = require("express-async-handler");
const { local_library_url } = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");

module.exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const bookinstances = await Bookinstance.find().populate("book").exec();
  res.render("bookinstance_list", {
    title: "Book Instance List",
    local_library_url: local_library_url,
    home_url: home_url,
    bookinstance_list: bookinstances,
  });
});

module.exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.bookinstance_create_get = asyncHandler(
  async (req, res, next) => {
    res.send("Not implemented");
  }
);

module.exports.bookinstance_create_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not implemented");
  }
);

module.exports.bookinstance_delete_get = asyncHandler(
  async (req, res, next) => {
    res.send("Not implemented");
  }
);

module.exports.bookinstance_delete_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not implemented");
  }
);

module.exports.bookinstance_update_get = asyncHandler(
  async (req, res, next) => {
    res.send("Not implemented");
  }
);

module.exports.bookinstance_update_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not implemented");
  }
);
