const mongoose = require("mongoose");
var { author_url } = require("../../constants/local-library-constant");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.family_name && this.first_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  return `${author_url}${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

module.exports = mongoose.model("Author", AuthorSchema);
