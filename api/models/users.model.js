import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({ firstname: String, lastname: String, username: String, password: String, isLoggedIn: Boolean, isAdmin: Boolean });
const usersModel = mongoose.model("users", usersSchema);

export { usersModel, usersSchema };
