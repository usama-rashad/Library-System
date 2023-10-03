import express from "express";
import multer from "multer";
import fs from "fs";

// Middleware
import { verifyUser_MW } from "./../middleware/auth/verifyUser.js";

const router = express.Router();

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // initial upload path
    cb(null, "public/uploads/images/temp");
  },
  filename: (req, file, cb) => {
    let { ISBN } = req.body;
    let fileName = file.fieldname + "_" + ISBN + "_" + file.originalname; // .split(".")[1]
    cb(null, fileName);
  },
  fileSize: (req, file, cb) => {
    if (file.fileSize > file.limits.fileSize) {
      req.fileSizeLimit = true;
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
});

const memoryStorage = multer.memoryStorage();

export const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 1024 * 1024 * 1 },
});

// Imports
import {
  updateBookThumbnailController,
  addBookImageController,
  addSingleBookImageController,
  deleteImageController,
  addNewBookController,
  findBookByISBNController,
  deleteBookByISBNController,
  updateBookInfoController,
  issueBookController,
  returnBookController,
  searchBookController,
  testBookController,
  returnImageUploadStatusController,
  fetchBookGenresController,
} from "./../controllers/bookController.js";

const bookTestRoute = router.get("/testBook", testBookController);
const addNewBookRoute = router.put("/addNew", verifyUser_MW, addNewBookController);
const addBookImageRoute = router.put("/addImage", verifyUser_MW, upload.array("bookImages"), addBookImageController);
const addSingleBookImageRoute = router.put("/addSingleImage", upload.single("bookImage"), addSingleBookImageController);
const deleteBookImageRoute = router.put("/deleteImage", verifyUser_MW, deleteImageController);
const updateBookThumbnailRoute = router.put("/updateThumbnail", upload.single("thumbnail"), updateBookThumbnailController);
const findBookByISBNRoute = router.post("/findByISBN", findBookByISBNController);
const deleteBookByISBNRoute = router.put("/deleteByISBN", deleteBookByISBNController);
const updateBookRoute = router.put("/updateBookInfo", verifyUser_MW, updateBookInfoController);
const issueBookRoute = router.put("/issueBook", verifyUser_MW, issueBookController);
const returnBookRoute = router.put("/returnBook", verifyUser_MW, returnBookController);
const searchBookRoute = router.get("/searchBookByName", searchBookController);
const imageUploadStatus = router.get("/getImageUploadStatus", returnImageUploadStatusController);
const fetchBookGenres = router.get("/fetchGenres", fetchBookGenresController);

export {
  bookTestRoute,
  addNewBookRoute,
  addBookImageRoute,
  addSingleBookImageRoute,
  deleteBookImageRoute,
  updateBookThumbnailRoute,
  updateBookRoute,
  findBookByISBNRoute,
  deleteBookByISBNRoute,
  issueBookRoute,
  returnBookRoute,
  searchBookRoute,
  imageUploadStatus,
  fetchBookGenres,
};
