const Author = require("../../models/local-library/author");
const asyncHandler = require("express-async-handler");
const { local_library_url } = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");

module.exports.author_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.author_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});
