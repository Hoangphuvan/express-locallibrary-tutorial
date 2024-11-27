const mongoose = require("mongoose");
const { genre_url } = require("../../constants/local_library_contant");

const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

GenreSchema.virtual("url").get(function () {
  return `${genre_url}${this._id}`;
});

module.exports = mongoose.model("Genre", GenreSchema);
