const Genre = require("../../models/local-library/genre");
const Book = require("../../models/local-library/book");
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
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }
  res.render("genre-detail", {
    title: "Genre Detail",
    local_library_url: local_library_url,
    home_url: home_url,
    genre: genre,
    genre_books: booksInGenre,
  });
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
