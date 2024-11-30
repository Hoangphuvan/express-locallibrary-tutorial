const Author = require("../../models/local-library/author");
const Book = require("../../models/local-library/book");
const asyncHandler = require("express-async-handler");
const { local_library_url } = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");

module.exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ family_name: -1 }).exec();
  res.render("author-list", {
    title: "Author list",
    local_library_url: local_library_url,
    home_url: home_url,
    author_list: allAuthors,
  });
});

module.exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, booksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("author-detail", {
    title: "Author detail",
    local_library_url: local_library_url,
    home_url: home_url,
    author: author,
    book_list: booksByAuthor,
  });
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
