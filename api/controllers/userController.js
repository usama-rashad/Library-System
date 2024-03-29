import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// DB
import { usersModel } from "./../models/users.model.js";
import { isDBConnectionOK } from "./../db/db.js";

// Helpers
const createAccessToken = (username) => {
  console.log("Created a new access token.");
  return jwt.sign({ username: username, createdTime: new Date() }, process.env.JWT_ACCESSTOKEN_PRIVATEKEY, {
    expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
    algorithm: "HS256",
  });
};

const createRefreshToken = (username) => {
  return jwt.sign({ username: username, createdTime: new Date() }, process.env.JWT_REFRESHTOKEN_PRIVATEKEY, {
    expiresIn: process.env.REFRESH_TOKEN_VALIDITY,
    algorithm: "HS256",
  });
};

const makeNameFirstLetterUpperCase = (name) => {
  let firstLetter = name.slice(0, 1);
  let restName = name.splice(0, 1);
  let final = firstLetter.toUpperCase() + restName;
  return final;
};

// Controllers

const signupController = async (req, res, next) => {
  let { username, password, firstname, lastname } = req.body;
  if (!username || !password || !firstname || !lastname) {
    return res.status(404).json({ message: "Mising information." });
  }
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
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.password = hashedPassword;
    newUser.isLoggedIn = false;
    newUser.isAdmin = false;
    await newUser.save();
    return res.status(200).json({ message: "New user has been created." });
  } catch (error) {
    // Check for system errors
    let errorResponse = "";
    if (!isDBConnectionOK) {
      error = "DB connection error";
    }
    console.log(error);
    return res.status(500).json({ message: "Error while creating new user." });
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
  let cookies = req.cookies;
  let ML_accessTokenCookie = cookies["ML_accessToken"];
  let ML_refreshTokenCookie = cookies["ML_refreshToken"];

  if (!ML_refreshTokenCookie) {
    return res.status(404).json({ message: "Login session invalid." });
  }
  let { username } = jwt.decode(ML_refreshTokenCookie, { json: true });
  // Find user
  try {
    let existingUser = await usersModel.findOne({ username: username });
    // Check if the password matches
    existingUser.isLoggedIn = false;
    await existingUser.save();
    console.log("Logout success");
    res.clearCookie("ML_accessToken");
    res.clearCookie("ML_refreshToken");
    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    return res.status(404).json({ message: "Logout error.", error: error });
  }
};

const loginController = async (req, res, next) => {
  // Check if user exists in user DB and log him in if the password is correct. Set a loginStatus flag in the DB
  let { username, password, rememberFlag } = req.body;
  console.log("Login request by " + username);
  if (!username || !password || username === "" || password === "") {
    return res.status(404).json({ message: "Username and/or password must be entered." });
  }
  // Find user
  try {
    let existingUser = await usersModel.findOne({ username: username });
    if (!existingUser) {
      return res.status(404).json({ message: "Username and/or password is incorrect." });
    }
    // Check if the password matches
    let comparisonResult = await bcrypt.compare(password, existingUser.password);
    if (comparisonResult) {
      // Password OK
      existingUser.isLoggedIn = true;
      await existingUser.save();
      // Create an access token and a refresh token for the user to access resources.
      let accessToken = createAccessToken(username);
      let refreshtoken = createRefreshToken(username);

      // If remember me flag is set then return access and refresh tokens
      if (rememberFlag === true) {
        res.cookie("ML_accessToken", accessToken, { httpOnly: true, maxAge: 30 * 1000 }); // 30 seconds
        res.cookie("ML_refreshToken", refreshtoken, { httpOnly: true, maxAge: 30 * 24 * 3600 * 1000 }); // 30 days
      }

      res
        .status(200)
        .json({
          message: "Login successful",
          isAdmin: existingUser.isAdmin,
          name: { first: existingUser.firstname, last: existingUser.lastname },
        })
        .send();
    } else {
      return res.status(404).json({ message: "Username and/or password is incorrect." });
    }
  } catch (error) {
    return res.status(404).json({ message: "Login error.", error: error });
  }
};

const checkLoginController = async (req, res, next) => {
  let cookies = req.cookies;
  let ML_accessToken = cookies["ML_accessToken"];
  let ML_refreshToken = cookies["ML_refreshToken"];

  // Check the validity of the refresh token
  // Create a new refresh token if not valid
  let isRefreshTokenValid = false;
  let decodedUsername = "";
  jwt.verify(ML_refreshToken, process.env.JWT_REFRESHTOKEN_PRIVATEKEY, function (error, decode) {
    console.log("Decoded refresh token " + JSON.stringify(decode));
    if (decode) {
      isRefreshTokenValid = true;
      let { username } = decode;
      decodedUsername = username;
    } else {
    }
  });
  if (!isRefreshTokenValid) {
    return res.status(404).json({ message: "Re-Login unsuccessful" });
  }

  // Check the validity of the access token
  // Create a new access token if not valid
  let isAccessTokenValid = false;
  let newAccessToken = "";
  jwt.verify(ML_accessToken, process.env.JWT_ACCESSTOKEN_PRIVATEKEY, function (error, decode) {
    console.log("Decoded access token " + JSON.stringify(decode));

    if (decode) {
      isAccessTokenValid = true;
    } else {
      newAccessToken = createAccessToken(decodedUsername);
      res.cookie("ML_accessToken", newAccessToken, { httpOnly: true, maxAge: 30 * 1000 });
    }
  });

  // Check the user status in the DB
  try {
    let existingUser = await usersModel.findOne({ username: decodedUsername });
    if (!existingUser) {
      return res.status(404).json({ message: "Re-Login unsuccessful" });
    }

    if (existingUser.isLoggedIn) {
      return res
        .status(200)
        .json({
          message: "Re-Login successful",
          username: decodedUsername,
          isAdmin: existingUser.isAdmin,
          name: { first: existingUser.firstname, last: existingUser.lastname },
        })
        .send();
    } else {
      return res.status(404).json({ message: "Re-Login unsuccessful" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Re-Login unsuccessful", error: error });
  }
};

const loginSystemStatusController = (req, res, next) => {
  return res.status(200).json({ message: "Login system status check.", status: isDBConnectionOK });
};

const loginCreateAccessTokenController = (req, res, next) => {
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

const getUsersByFirstName = async (req, res, next) => {
  let { firstname } = req.body;

  let searchPattern = firstname;
  // Search in the DB for the name
  let usersList = await usersModel.find({ firstname: { $regex: searchPattern, $options: "i" } });
  let userData = usersList.map((user) => {
    return { firstName: user.firstname, lastname: user.lastname, isAdmin: user.isAdmin, username: user.username };
  });
  return res.status(200).json({ message: `Found ${userData.length} users.`, data: userData });
};

export {
  signupController,
  deleteUserController,
  loginController,
  checkLoginController,
  logoutController,
  loginSystemStatusController,
  loginCreateAccessTokenController,
  getUsersByFirstName,
};
