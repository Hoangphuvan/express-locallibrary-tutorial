const Author = require("../../models/local-library/author");
const Book = require("../../models/local-library/book");
const asyncHandler = require("express-async-handler");
const {
  local_library_url,
  all_authors_url,
} = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");
const { body, validationResult } = require("express-validator");

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
  res.render("author-form", {
    title: "Create Author",
    local_library_url: local_library_url,
    home_url: home_url,
  });
});

module.exports.author_create_post = [
  body("first_name", "First name must be not empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("family_name", "Family name must be not empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("date_of_birth", "Date of birth is invalid.")
    .trim()
    .optional({ values: "falsy" })
    .isISO8601()
    .escape(),
  body("date_of_death", "Date of death is invalid.")
    .trim()
    .optional({ values: "falsy" })
    .isISO8601()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("author-form", {
        title: "Create Author",
        local_library_url: local_library_url,
        home_url: home_url,
        author: author,
        errors: errors.array(),
      });
    } else {
      await author.save();
      res.redirect(author.url);
    }
  }),
];

module.exports.author_delete_get = asyncHandler(async (req, res, next) => {
  const [author, booksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary")
      .sort({ title: -1 })
      .exec(),
  ]);

  if (author == null) {
    res.redirect(all_authors_url);
  } else {
    res.render("author-delete.pug", {
      title: "Delete Author",
      local_library_url: local_library_url,
      home_url: home_url,
      author: author,
      book_list: booksByAuthor,
    });
  }
});

module.exports.author_delete_post = asyncHandler(async (req, res, next) => {
  const [author, booksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary")
      .sort({ title: -1 })
      .exec(),
  ]);

  if (booksByAuthor.length > 0) {
    res.render("author-delete.pug", {
      title: "Delete Author",
      local_library_url: local_library_url,
      home_url: home_url,
      author: author,
      book_list: booksByAuthor,
    });
  } else {
    await Author.findByIdAndDelete(req.body.authorid).exec();
    res.redirect(all_authors_url);
  }
});

module.exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});

module.exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});
