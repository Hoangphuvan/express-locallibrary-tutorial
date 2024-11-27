const mongoose = require("mongoose");
const { bookinstance_url } = require("../../constants/local_library_contant");

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
  return `${bookinstance_url}${this_id}`;
});

module.exports = mongoose.model("Bookinstance", BookinstanceSchema);
