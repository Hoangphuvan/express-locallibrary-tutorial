const Genre = require("../../models/local-library/genre");
const asyncHandler = require("express-async-handler");
const { local_library_url } = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");

module.exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: -1 }).exec();

  res.render("genre-list", {
    title: "Genre List",
    local_library_url: local_library_url,
    home_url: home_url,
    genre_list: allGenres,
  });
});

module.exports.genre_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});
