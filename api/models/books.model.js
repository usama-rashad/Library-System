import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  ISBN: String,
  title: String,
  author: String,
  issueCout: Number,
  thumbnail: String,
  addDate: Date,
  additionalImages: [String],
  details: [], // type {serialNumber: Number, aisle: String, shelf: String}
  issueList: [], // userID: String, issueDate: Date, isIssued: Boolean
});
const booksModel = mongoose.model("books", booksSchema);

export { booksModel, booksSchema };
