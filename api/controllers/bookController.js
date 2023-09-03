import { booksModel } from "../models/books.model.js";
import { upload } from "../routes/bookRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const maxBookImages = 5;

// HELPERS
function createDate() {
  let date = new Date();
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
function addImageToList(newImage, list) {
  console.log(list);
  let newList = list.push(newImage);
  return newList;
}
function validateStorageInfo(storageInfo) {
  let missingRowCount = 0;
  storageInfo.forEach((dataRow) => {
    let { serialNumber, aisle, shelf } = dataRow;
    if (!serialNumber || !aisle || !shelf) {
      missingRowCount++;
    }
  });
  return missingRowCount;
}
function deleteFiles(filesList) {
  const __filename = fileURLToPath(import.meta.url);
  // let appDirName = path.dirname(__filename);
  console.log(filesList);
  filesList.forEach((file) => {
    fs.unlinkSync("./public/uploads/images/temp/" + file);
  });
}

// CONTROLLERS
const updateBookThumbnailController = async (req, res, next) => {
  let { ISBN } = req.body;
  let thumbnailName = req.imageName;
  if (!thumbnailName) {
    return res.status(404).json({ message: `File name or ISBN not provided.` });
  }
  if (req.fileSizeLimit) {
    return res.status(404).json({ message: `File size is too large. Make sure file is smaller than 1MB.` });
  }
  // Find a previous book and compare ISBNs
  let existingBook = await booksModel.findOne({ ISBN: ISBN });
  if (!existingBook) {
    return res.status(404).json({ message: `Book with ISBN ${ISBN} not found.` });
  }
  existingBook.thumbnail = thumbnailName;
  try {
    let saveResult = await existingBook.save();
    return res.status(200).json({ message: `Book thumbnail has been updated.` });
  } catch (error) {
    return res.status(404).json({ message: `Error while saving to database.` });
  }
};

const addBookImageController = async (req, res, next) => {
  let { ISBN } = req.body;
  let files = req.files;
  let fileQty = files.length;

  let filesList = [];
  files.forEach((file, index) => {
    filesList.push(file.fieldname + "_" + ISBN + "_" + file.originalname);
  });

  if (files.length === 0) {
    deleteFiles(filesList); // Delete the uploaded files if there is an error to avoid having unreference files
    return res.status(404).json({ message: `Not image selected. Select atleast one image.` });
  }
  if (files.length > maxBookImages) {
    deleteFiles(filesList); // Delete the uploaded files if there is an error to avoid having unreference files
    return res.status(404).json({ message: `Not possible to add more than 5 images.` });
  }
  if (req.fileSizeLimit) {
    deleteFiles(filesList); // Delete the uploaded files if there is an error to avoid having unreference files
    return res.status(404).json({ message: `File size is too large. Make sure that the file is smaller than 1MB.` });
  }
  // Find a previous book and compare ISBNs
  let existingBook = await booksModel.findOne({ ISBN: ISBN });
  if (!existingBook) {
    deleteFiles(filesList); // Delete the uploaded files if there is an error to avoid having unreference files
    if (ISBN === "") {
      return res.status(404).json({ message: `No ISBN provided. Check your ISBN.` });
    }
    return res.status(404).json({ message: `Book with ISBN ${ISBN} not found. Add the book first and then upload the images.` });
  }
  // Clear existing images
  existingBook.additionalImages = [];
  files.forEach((value, index) => {
    existingBook.additionalImages[index] = value.originalname;
  });

  try {
    let saveResult = await existingBook.save();
    return res.status(200).json({ message: `Added ${fileQty} images.` });
  } catch (error) {
    deleteFiles(filesList); // Delete the uploaded files if there is an error to avoid having unreference files
    return res.status(404).json({ message: `Error while saving to database.` });
  }
};

const addNewBookController = async (req, res, next) => {
  let { title, author, ISBN, description, storageInfo } = req.body;
  if (!title || !author || !ISBN || !description || !storageInfo) {
    return res.status(404).json({ message: "Missing information" });
  }
  let missingRows = validateStorageInfo(storageInfo);
  if (missingRows > 0) {
    return res.status(404).json({ message: `Storage data missing from ${missingRows} ${missingRows > 1 ? "rows" : "row"}` });
  }
  // Find a previous book and compare ISBNs
  let existingBook = await booksModel.findOne({ ISBN: ISBN });
  if (existingBook) {
    return res.status(404).json({ message: `Book with ISBN ${ISBN} already exists.` });
  }
  // No book found so add a new book
  let newBook = new booksModel();
  newBook.title = title;
  newBook.author = author;
  newBook.ISBN = ISBN;
  newBook.addDate = new Date();
  newBook.description = description;
  // List of books in the inventory
  newBook.storageInfo = storageInfo;
  try {
    let saveResult = await newBook.save();
    return res.status(200).json({ message: `Book with ISBN ${ISBN} added to database.` });
  } catch (error) {
    return res.status(404).json({ message: `Error while saving to database.` });
  }
};

const updateBookInfoController = async (req, res, next) => {
  let { title, author, ISBN, aisle, shelf, serialNumber, description } = req.body;
  if (!title || !author || !ISBN || !aisle || !shelf || !serialNumber || !description) {
    return res.status(404).json({ message: `Missing information. Book was not updated.` });
  }
  // Find a previous book and compare ISBNs
  let existingBook = await booksModel.findOne({ ISBN: ISBN });
  if (!existingBook) {
    return res.status(404).json({ message: `Book with ISBN ${ISBN} not found. Data not updated.` });
  }
  // No book found so add a new book
  existingBook.title = title;
  existingBook.author = author;
  existingBook.description = description;
  existingBook.serialNumber = serialNumber;
  try {
    let saveResult = await existingBook.save();
    return res.status(200).json({ message: `Book data updated.` });
  } catch (error) {
    return res.status(404).json({ message: `Error while saving to new data.` });
  }
};

const deleteBookByISBNController = async (req, res, next) => {
  let { ISBN } = req.body;
  // Find book and delete
  let existingBook = await booksModel.findOne({ ISBN: ISBN });
  if (existingBook) {
    existingBook.deleteOne();
    return res.status(200).json({ message: `Book with ISBN ${ISBN} deleted.` });
  } else {
    return res.status(404).json({ message: "Book was not found." });
  }
};

const deleteImageController = async (req, res, next) => {
  let { ISBN, imageNumber } = req.body;
  // Find a previous book and compare ISBNs
  let existingBook = await booksModel.findOne({ ISBN: ISBN });
  if (!existingBook) {
    return res.status(404).json({ message: `Book with ISBN ${ISBN} not found.` });
  }
  let images = existingBook.additionalImages;
  images[imageNumber] = null;
  existingBook.additionalImages = images;
  try {
    let saveResult = await existingBook.save();
    return res.status(200).json({ message: `Book image has been removed.` });
  } catch (error) {
    return res.status(404).json({ message: `Error while saving to database.` });
  }
};

const findBookByISBNController = async (req, res, next) => {
  let { ISBN } = req.body;
  // Find book by ISBN
  let result = await booksModel.find({ ISBN: ISBN });
  if (result) {
    return res.status(200).json({ message: "Books found", books: result });
  } else {
    return res.status(404).json({ message: "Error while searching." });
  }
};

const issueBookController = async (req, res, next) => {
  let { ISBN, issuedTo } = req.body;
  // Find a book with the ISBN and issue it.
  try {
    let book = await booksModel.findOne({ ISBN: ISBN });
    if (book) {
      if (book.isIssued) {
        return res.status(404).json({ message: `Book is already issued to user ID ${book.issuedTo}.` });
      }
      book.isIssued = true;
      book.issuedTo = issuedTo;
      book.issueDate = new Date();
      book.issueCout = book.issueCout + 1;
      book.save();
      return res.status(404).json({ message: `Book successfully issued to ${issuedTo}.` });
    } else {
      return res.status(404).json({ message: `Book with ISBN ${ISBN} not found.` });
    }
  } catch (error) {
    return res.status(200).json({ message: `Error while issuing book with ISBN ${ISBN} to ${issuedTo}.` });
  }
};

const returnBookController = async (req, res, next) => {
  let { ISBN } = req.body;
  let book;
  // Find the book and return it to the inventory
  try {
    book = await booksModel.findOne({ ISBN: ISBN });
    if (!book) {
      return res.status(404).json({ message: `Book with ISBN ${ISBN} not found.` });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error while searching for the book." });
  }
  // Check if the book is already free
  if (!book.isIssued) {
    return res.status(404).json({ message: "Book is already in the inventory." });
  }
  book.isIssued = false;
  book.issuedTo = "";
  book.issueDate = "";

  try {
    await book.save();
    return res.status(200).json({ message: `Book with ISBN ${ISBN} returned to inventory.` });
  } catch (error) {
    return res.status(200).json({ message: `Error while returning book to inventory.` });
  }
};

const searchBookController = async (req, res, next) => {
  let { title } = req.body;
  console.log(title);
  if (!title || title === "") {
    return res.status(404).json({ message: "No book name. Enter a name." });
  }
  // Search for the book by name
  await booksModel
    .find({ title: { $regex: title, $options: "i" } })
    .then((results) => {
      if (results.length > 0) {
        // Return only book information relevant to the generic user.
        let books = results.map((book) => {
          let { ISBN, title, author, thumbnail } = book;
          return { ISBN, title, author, thumbnail };
        });
        return res.status(200).json({ message: "Books found.", books: books });
      } else {
        return res.status(404).json({ message: "No books found" });
      }
    })
    .catch((error) => {
      return res.status(404).json({ message: "Query result failed." });
    });
};

const testBookController = async (req, res, next) => {
  console.log("Test called");
  setTimeout(() => {
    return res.status(404).json({ message: "Book test failed." });
  }, 2000);
};

export {
  testBookController,
  addNewBookController,
  updateBookThumbnailController,
  addBookImageController,
  deleteImageController,
  findBookByISBNController,
  updateBookInfoController,
  deleteBookByISBNController,
  issueBookController,
  returnBookController,
  searchBookController,
};
