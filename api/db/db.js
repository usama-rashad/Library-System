import mongoose from "mongoose";
import env from "dotenv";

env.config();

export let isDBConnectionOK = false;

const dbConnection = mongoose
  .connect(process.env.DB_URL, { autoCreate: true })
  .then((results) => {
    console.log("DB connection successfull.");
    isDBConnectionOK = true;
  })
  .catch((error) => {
    console.log("DB connection failed. Error code -> " + error);
    isDBConnectionOK = false;
  });

export const closeDB = () => {
  console.log("Closing the DB connection.");
  dbConnection.close();
};

export default dbConnection;
