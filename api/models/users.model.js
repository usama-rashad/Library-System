import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({ username: String, email: String, password: String, isLoggedIn: Boolean, isAdmin: Boolean });
const usersModel = mongoose.model("users", usersSchema);

export { usersModel, usersSchema };
