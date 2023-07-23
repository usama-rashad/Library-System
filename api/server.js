import env from "dotenv";
import app from "./main.js";

env.config();

// Start Server
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server starter at port " + process.env.SERVER_PORT);
});
