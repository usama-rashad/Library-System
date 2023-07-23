import express from "express";
import multer from "multer";

// Middleware
import { verifyUser_MW } from "./../middleware/auth/verifyUser.js";

const router = express.Router();

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let { ISBN, imageNumber } = req.body;
    let fileName = imageNumber + "_" + file.fieldname + "_" + ISBN + "." + file.originalname.split(".")[1];
    cb(null, fileName);
    // Add the filename for further use
    req.imageName = fileName;
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

const upload = multer({
  storage: diskStorage,
  limits: { fileSize: 1024 * 1024 * 1 },
});

// Imports
import {
  updateBookThumbnailController,
  addBookImageController,
  deleteImageController,
  addNewBookController,
  findBookByISBNController,
  deleteBookByISBNController,
  updateBookInfoController,
  issueBookController,
  returnBookController,
  searchBookController,
} from "./../controllers/bookController.js";

const addNewBookRoute = router.put("/addNew", verifyUser_MW, addNewBookController);
const addBookImageRoute = router.put("/addImage", verifyUser_MW, upload.single("bookImage"), addBookImageController);
const deleteBookImageRoute = router.put("/deleteImage", verifyUser_MW, deleteImageController);
const updateBookThumbnailRoute = router.put("/updateThumbnail", upload.single("thumbnail"), updateBookThumbnailController);
const findBookByISBNRoute = router.get("/findByISBN", verifyUser_MW, findBookByISBNController);
const deleteBookByISBNRoute = router.delete("/deleteByISBN", verifyUser_MW, deleteBookByISBNController);
const updateBookRoute = router.put("/updateBookInfo", verifyUser_MW, updateBookInfoController);
const issueBookRoute = router.put("/issueBook", verifyUser_MW, issueBookController);
const returnBookRoute = router.put("/returnBook", verifyUser_MW, returnBookController);
const searchBookRoute = router.get("/searchBookByName", searchBookController);

export {
  addNewBookRoute,
  addBookImageRoute,
  deleteBookImageRoute,
  updateBookThumbnailRoute,
  updateBookRoute,
  findBookByISBNRoute,
  deleteBookByISBNRoute,
  issueBookRoute,
  returnBookRoute,
  searchBookRoute,
};
