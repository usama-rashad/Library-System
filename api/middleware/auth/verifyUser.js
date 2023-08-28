import express from "express";
import { usersModel } from "../../models/users.model.js";

const verifyUser_MW = async (req, res, next) => {
  let { username } = req.body;
  if (Object.keys(req.body).length === 0) {
    next();
  } else {
    if (!username || username === "") {
      return res.status(404).json({ message: "Username must be provided for resource access." });
    }
    // Find user
    try {
      let existingUser = await usersModel.findOne({ username: username });
      if (!existingUser.isLoggedIn) {
        return res.status(404).json({ message: "User not logged-in. Access denied." });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "Error while checking user priveleges. Access denied." });
    }
  }
};
const basicAuth_MW = (req, res, next) => {
  let header = "";
  if (req.headers.authorization) {
    header = new Buffer.from(req.headers.authorization.split(" ")[1], "base64").toString();
  }
  if (!header) {
    return res.status(401).json({ message: "No authorization provided." });
  }
  let authUsername = header.split(":")[0];
  let authPassword = header.split(":")[1];
  if (authUsername === "usama" && authPassword === "visual123") {
    next();
  }
  return res.status(401).json({ message: "Not authorized." });
};

export { verifyUser_MW, basicAuth_MW };
