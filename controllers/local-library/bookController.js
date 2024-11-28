const Book = require("../../models/local-library/book");
const BookInstance = require("../../models/local-library/bookinstance");
const Genre = require("../../models/local-library/genre");
const Author = require("../../models/local-library/author");
const asyncHandler = require("express-async-handler");
const { local_library_url } = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");

module.exports.index = asyncHandler(async (req, res, next) => {
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenre,
  ] = await Promise.all([
    Book.countDocuments().exec(),
    BookInstance.countDocuments().exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Genre.countDocuments().exec(),
    Author.countDocuments().exec(),
  ]);
  res.render("lb-index", {
    local_library_url: local_library_url,
    home_url: home_url,
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    genre_count: numGenre,
    author_count: numAuthors,
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
