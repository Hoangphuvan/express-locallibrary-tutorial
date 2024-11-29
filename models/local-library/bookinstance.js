const mongoose = require("mongoose");
const { bookinstance_url } = require("../../constants/local-library-constant");
const { DateTime } = require("luxon");

const BookinstanceSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Available",
  },
  due_back: { type: Date, default: Date.now },
});

BookinstanceSchema.virtual("url").get(function () {
  return `${bookinstance_url}${this._id}`;
});

BookinstanceSchema.virtual("due_back_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.due_back).toISODate();
});

module.exports = mongoose.model("Bookinstance", BookinstanceSchema);
