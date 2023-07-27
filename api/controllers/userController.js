import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// DB
import { usersModel } from "./../models/users.model.js";
import { isDBConnectionOK } from "./../db/db.js";

const signupController = async (req, res, next) => {
  let { username, password, email } = req.body;
  // Check if the username already exists
  let existingUser = await usersModel.findOne({ username: username });
  if (existingUser) return res.status(404).json({ message: "User already exsits." });

  // Create a hashed password for safe storage
  let salt = bcrypt.genSaltSync(10);
  try {
    let hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    let newUser = new usersModel();
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.isLoggedIn = false;
    newUser.isAdmin = false;
    newUser.email = email ? email : "NA";
    await newUser.save();
    return res.status(200).json({ message: "New user has been created." });
  } catch (error) {
    // Check for system errors
    let errorResponse = "";
    if (!isDBConnectionOK) {
      error = "DB connection error";
    }
    return res.status(500).json({ message: "Error while creating new user.", error: error });
  }
};

const deleteUserController = async (req, res, next) => {
  const { username } = req.body;
  // Find the user in the DB
  try {
    let userToDelete = await usersModel.findOne({ username: username });
    if (!userToDelete) {
      return res.status(404).json({ message: `User ${username} not found` });
    }
    await userToDelete.deleteOne();
    return res.status(200).json({ message: `User ${username} has been deleted.` });
  } catch (error) {
    return res.status(404).json({ message: "User could not be deleted.", error: error });
  }
};

const logoutController = async (req, res, next) => {
  // Check if user exists in user DB and log him out. Reset a loginStatus flag in the DB
  let { username } = req.body;
  console.log(req.body);
  if (!username || username === "") {
    return res.status(404).json({ message: "Username must be provided." });
  }
  // Find user
  try {
    let existingUser = await usersModel.findOne({ username: username });
    // Check if the password matches
    existingUser.isLoggedIn = false;
    await existingUser.save();
    console.log("Logout success");
    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    return res.status(404).json({ message: "Logout error.", error: error });
  }
};

const loginController = async (req, res, next) => {
  // Check if user exists in user DB and log him in if the password is correct. Set a loginStatus flag in the DB
  let { username, password, rememberFlag } = req.body;
  console.log(req.body);
  if (!username || !password || username === "" || password === "") {
    return res.status(404).json({ message: "Username and/or password must be entered." });
  }
  // Find user
  try {
    let existingUser = await usersModel.findOne({ username: username });
    if (!existingUser) {
      throw "Username not found";
    }
    // Check if the password matches
    let comparisonResult = await bcrypt.compare(password, existingUser.password);
    if (comparisonResult) {
      // Password OK
      existingUser.isLoggedIn = true;
      await existingUser.save();
      // Create an access token and a refresh token for the user to access resources.
      let accessToken = jwt.sign({ username: username, createdTime: new Date() }, process.env.JWT_ACCESSTOKEN_PRIVATEKEY, {
        expiresIn: "1m",
        algorithm: "HS256",
      });
      let refreshtoken = jwt.sign({ username: username, createdTime: new Date() }, process.env.JWT_REFRESHTOKEN_PRIVATEKEY, {
        expiresIn: "30d",
        algorithm: "HS256",
      });
      res.cookie("MTL_accessToken", accessToken);
      res.cookie("MTL_refreshToken", refreshtoken);
      return res.status(200).json({ message: "Login successful." });
    } else {
      return res.status(404).json({ message: "Username and/or password is incorrect." });
    }
  } catch (error) {
    return res.status(404).json({ message: "Login error.", error: error });
  }
};

const loginSystemStatusController = (req, res, next) => {
  return res.status(200).json({ message: "Login system status check.", status: isDBConnectionOK });
};

const loginCreateAccessToken = (req, res, next) => {
  let decodedToken;
  let authHeader = req.headers?.authorization;
  if (!authHeader) {
    return res.status(404).json({ message: "No refresh token found." });
  }
  let token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "No refresh token found." });
  }
  try {
    decodedToken = jwt.verify(token, process.env.JWT_REFRESHTOKEN_PRIVATEKEY);
  } catch (error) {
    res.status(200).json({ message: "Invalid token. Access denied." });
  }
  // Create a new access token and update the database
  let accessToken = jwt.sign({ username: username, createdTime: new Date() }, process.env.JWT_ACCESSTOKEN_PRIVATEKEY, {
    expiresIn: "1m",
    algorithm: "HS256",
  });
};

export { signupController, deleteUserController, loginController, logoutController, loginSystemStatusController, loginCreateAccessToken };
