const Book = require("../../models/local-library/book");
const BookInstance = require("../../models/local-library/bookinstance");
const Genre = require("../../models/local-library/genre");
const Author = require("../../models/local-library/author");
const asyncHandler = require("express-async-handler");
const {
  local_library_url,
  all_books_url,
} = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");
const { body, validationResult } = require("express-validator");

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
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("book-list", {
    title: "Book List",
    local_library_url: local_library_url,
    home_url: home_url,
    book_list: allBooks,
  });
});

module.exports.book_detail = asyncHandler(async (req, res, next) => {
  const [book, allBookinstances] = await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);

  if (book === null) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("book-detail", {
    title: "Book detail",
    local_library_url: local_library_url,
    home_url: home_url,
    book: book,
    book_instances: allBookinstances,
  });
});

module.exports.book_create_get = asyncHandler(async (req, res, next) => {
  const [allauthors, allgenres] = await Promise.all([
    Author.find().sort({ family_name: -1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);
  res.render("book-form", {
    title: "Create Book",
    local_library_url: local_library_url,
    home_url: home_url,
    author_list: allauthors,
    genre_list: allgenres,
  });
});

module.exports.book_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === undefined ? [] : [req.body.genre];
    }
    next();
  },

  body("title", "Title must be specified.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must be specified.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must be specified.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const [allauthors, allgenres] = await Promise.all([
        Author.find().sort({ family_name: -1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);

      for (const genre of allgenres) {
        if (book.includes(genre._id)) {
          genre.checked = true;
        }
      }

      res.render("book-form", {
        title: "Create Book",
        local_library_url: local_library_url,
        home_url: home_url,
        book: book,
        author_list: allauthors,
        genre_list: allgenres,
        errors: errors.array(),
      });
    } else {
      await book.save();
      res.redirect(book.url);
    }
  }),
];

module.exports.book_delete_get = asyncHandler(async (req, res, next) => {
  const [book, allBookInstances] = await Promise.all([
    Book.findById(req.params.id).exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);
  res.render("book-delete", {
    title: "Delete Book",
    local_library_url: local_library_url,
    home_url: home_url,
    book: book,
    bookinstance_list: allBookInstances,
  });
});

module.exports.book_delete_post = asyncHandler(async (req, res, next) => {
  const [book, allBookInstances] = await Promise.all([
    Book.findById(req.params.id).exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);
  if (allBookInstances.length > 0) {
    res.render("book-delete", {
      title: "Delete Book",
      local_library_url: local_library_url,
      home_url: home_url,
      book: book,
      bookinstance_list: allBookInstances,
    });
  } else {
    await Book.findByIdAndDelete(req.body.bookid, book).exec();
    res.redirect(all_books_url);
  }
});

module.exports.book_update_get = asyncHandler(async (req, res, next) => {
  const [book, allauthors, allgenres] = await Promise.all([
    Book.findById(req.params.id).exec(),
    Author.find().sort({ family_name: -1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);

  res.render("book-form", {
    title: "Update Book",
    local_library_url: local_library_url,
    home_url: home_url,
    book: book,
    author_list: allauthors,
    genre_list: allgenres,
  });
});

module.exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented");
});
