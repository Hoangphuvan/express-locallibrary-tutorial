const Bookinstance = require("../../models/local-library/bookinstance");
const Book = require("../../models/local-library/book");
const asyncHandler = require("express-async-handler");
const {
  local_library_url,
  all_bookinstances_url,
} = require("../../constants/local-library-constant");
const { home_url } = require("../../constants/app-constant");
const { body, validationResult } = require("express-validator");

module.exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const bookinstances = await Bookinstance.find().populate("book").exec();
  res.render("bookinstance-list", {
    title: "Book Instance List",
    local_library_url: local_library_url,
    home_url: home_url,
    bookinstance_list: bookinstances,
  });
});

module.exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookinstance = await Bookinstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookinstance === null) {
    const err = new Error("Book Instance not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance-detail", {
    title: "Book Instance Detail",
    local_library_url: local_library_url,
    home_url: home_url,
    bookinstance: bookinstance,
  });
});

module.exports.bookinstance_create_get = asyncHandler(
  async (req, res, next) => {
    const allbooks = await Book.find().sort({ title: 1 }).exec();
    res.render("bookinstance-form", {
      title: "Create Book Instance",
      local_library_url: local_library_url,
      home_url: home_url,
      book_list: allbooks,
    });
  }
);

module.exports.bookinstance_create_post = [
  body("book", "Book must be specified.").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specfied.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Due back is invalid.")
    .optional({ values: "falsy" })
    .trim()
    .isISO8601(),
  asyncHandler(async (req, res, next) => {
    const bookinstance = new Bookinstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const allbooks = await Book.find().sort({ title: 1 }).exec();
      res.render("bookinstance-form", {
        title: "Create Book Instance",
        local_library_url: local_library_url,
        home_url: home_url,
        book_list: allbooks,
        bookinstance: bookinstance,
        errors: errors.array(),
      });
    } else {
      await bookinstance.save();
      res.redirect(bookinstance.url);
    }
  }),
];

module.exports.bookinstance_delete_get = asyncHandler(
  async (req, res, next) => {
    const bookinstance = await Bookinstance.findById(req.params.id).exec();
    res.render("bookinstance-delete", {
      title: "Delete Book Instance",
      local_library_url: local_library_url,
      home_url: home_url,
      bookinstance: bookinstance,
    });
  }
);
module.exports.bookinstance_delete_post = asyncHandler(
  async (req, res, next) => {
    await Bookinstance.findByIdAndDelete(req.body.bookinstanceid).exec();
    res.redirect(all_bookinstances_url);
  }
);

module.exports.bookinstance_update_get = asyncHandler(
  async (req, res, next) => {
    const [bookinstance, allbooks] = await Promise.all([
      Bookinstance.findById(req.params.id).exec(),
      Book.find().sort({ title: 1 }).exec(),
    ]);
    res.render("bookinstance-form", {
      title: "Update Book Instance",
      local_library_url: local_library_url,
      home_url: home_url,
      bookinstance: bookinstance,
      book_list: allbooks,
    });
  }
);

module.exports.bookinstance_update_post = [
  body("book", "Book must be specified.").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specfied.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Due back is invalid.")
    .optional({ values: "falsy" })
    .trim()
    .isISO8601(),
  asyncHandler(async (req, res, next) => {
    const bookinstance = new Bookinstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const allbooks = await Book.find().sort({ title: 1 }).exec();
      res.render("bookinstance-form", {
        title: "Update Book Instance",
        local_library_url: local_library_url,
        home_url: home_url,
        book_list: allbooks,
        bookinstance: bookinstance,
        errors: errors.array(),
      });
    } else {
      await Bookinstance.findByIdAndUpdate(req.params.id, bookinstance);
      res.redirect(bookinstance.url);
    }
  }),
];
