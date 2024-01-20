import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

export const dbConnection = mongoose.connection;

export default dbConnection;
