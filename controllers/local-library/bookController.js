const Book = require("../../models/local-library/book");
const asyncHandler = require("express-async-handler");
const { local_library_url } = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");

module.exports.index = asyncHandler(async (req, res, next) => {
  res.render("local-library-layout", {
    local_library_url: local_library_url,
    home_url: home_url,
  });
});

module.exports.book_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.book_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});
