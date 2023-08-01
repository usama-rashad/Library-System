import env from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// Route imports
import { loginRoute, loginSystemStatusRoute, logoutRoute, signupRoute, deleteUserRoute, loginCreateAccessTokenRoute } from "./routes/userRoutes.js";
import {
  addNewBookRoute,
  addBookImageRoute,
  deleteBookImageRoute,
  updateBookThumbnailRoute,
  findBookByISBNRoute,
  deleteBookByISBNRoute,
  updateBookRoute,
  issueBookRoute,
  returnBookRoute,
  searchBookRoute,
} from "./routes/bookRoutes.js";

env.config();

const app = express();

// CORS and JSON parser, Cookie parser
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:4000" })); // Port of the client app
app.use(express.json());

// Routes
const USERS_API = "/api/users";
const BOOKS_API = "/api/books";
// Users
app.use(USERS_API, loginRoute);
app.use(USERS_API, logoutRoute);
app.use(USERS_API, signupRoute);
app.use(USERS_API, deleteUserRoute);
app.use(USERS_API, loginSystemStatusRoute);
app.use(USERS_API, loginCreateAccessTokenRoute);

// Books
app.use(BOOKS_API, addNewBookRoute);
app.use(BOOKS_API, addBookImageRoute);
app.use(BOOKS_API, updateBookThumbnailRoute);
app.use(BOOKS_API, deleteBookImageRoute);
app.use(BOOKS_API, findBookByISBNRoute);
app.use(BOOKS_API, deleteBookByISBNRoute);
app.use(BOOKS_API, updateBookRoute);
app.use(BOOKS_API, issueBookRoute);
app.use(BOOKS_API, returnBookRoute);
app.use(BOOKS_API, searchBookRoute);

export default app;
