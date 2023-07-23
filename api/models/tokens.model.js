import mongoose from "mongoose";

const tokensSchema = new mongoose.Schema({ username: String, accessToken: String, refreshToken: String });
const tokensModel = mongoose.model("tokens", tokensSchema);

export { tokensModel, tokensSchema };
