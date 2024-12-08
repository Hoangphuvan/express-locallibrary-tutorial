const mongoose = require("mongoose");
const { book_url } = require("../constants/local-library-constant");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
});

BookSchema.virtual("url").get(function () {
  return `${book_url}${this._id}`;
});

module.exports = mongoose.model("Book", BookSchema);
