const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const {
  local_library_url,
  all_genres_url,
} = require("../constants/local-library-constant");
const { home_url } = require("../constants/app-constant");

const { body, validationResult } = require("express-validator");

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

module.exports.genre_create_get = (req, res, next) => {
  res.render("genre-form", {
    title: "Create Genre",
    local_library_url: local_library_url,
    home_url: home_url,
  });
};

// handle create genre on post
module.exports.genre_create_post = [
  // validate and sanitize the name field
  body("name", "Genre name must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // process the request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract the validation error from the request
    const errors = validationResult(req);
    // create new Genre object with escapsed and trimmed data
    const genre = new Genre({ name: req.body.name });
    if (!errors.isEmpty()) {
      // There are errors. render the genre with the errors
      res.render("genre-form", {
        title: "Create Genre",
        local_library_url: local_library_url,
        home_url: home_url,
        genre: genre,
        errors: errors.array(),
      });
    } else {
      // data from form is valid
      // check existing the name
      const genreFetch = await Genre.findOne({ name: genre.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (genreFetch) {
        // redirect to the genre detail
        res.redirect(genreFetch.url);
      } else {
        // save the genre to database and then redirect to the genre detail page
        await genre.save();
        res.redirect(genre.url);
      }
    }
  }),
];

module.exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre-delete", {
    title: "Delete Genre",
    local_library_url: local_library_url,
    home_url: home_url,
    genre: genre,
    genre_books: booksInGenre,
  });
});

module.exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  if (booksInGenre.length > 0) {
    res.render("genre-delete", {
      title: "Delete Genre",
      local_library_url: local_library_url,
      home_url: home_url,
      genre: genre,
      genre_books: booksInGenre,
    });
  } else {
    await Genre.findByIdAndDelete(req.body.genreid).exec();
    res.redirect(all_genres_url);
  }
});

module.exports.genre_update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();
  res.render("genre-form", {
    title: "Update Genre",
    local_library_url: local_library_url,
    home_url: home_url,
    genre: genre,
  });
});

module.exports.genre_update_post = [
  // validate and sanitize the name field
  body("name", "Genre name must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // process the request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract the validation error from the request
    const errors = validationResult(req);
    // create new Genre object with escapsed and trimmed data
    const genre = new Genre({ name: req.body.name, _id: req.params.id });
    if (!errors.isEmpty()) {
      // There are errors. render the genre with the errors
      res.render("genre-form", {
        title: "Update Genre",
        local_library_url: local_library_url,
        home_url: home_url,
        genre: genre,
        errors: errors.array(),
      });
    } else {
      // data from form is valid
      // check existing the name
      const genreFetch = await Genre.findOne({ name: genre.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (genreFetch) {
        // redirect to the genre detail
        res.redirect(genreFetch.url);
      } else {
        // save the genre to database and then redirect to the genre detail page
        await Genre.findByIdAndUpdate(req.params.id, genre).exec();
        res.redirect(genre.url);
      }
    }
  }),
];
