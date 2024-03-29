import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  ISBN: String,
  title: String,
  author: String,
  thumbnail: String,
  genre: String,
  description: String,
  addDate: Date,
  additionalImages: [], // { String, String }
  storageInfo: [], // type {serialNumber: Number, aisle: String, shelf: String}
  issueList: [], // userID: String, issueDate: Date, isIssued: Boolean
});
const booksModel = mongoose.model("books", booksSchema, "books");

export { booksModel, booksSchema };
