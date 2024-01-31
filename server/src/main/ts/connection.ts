import mongoose from "mongoose";
import "dotenv/config";

if (process.env.NODE_ENV === "production")
{
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DIST_HOST}/?retryWrites=true&w=majority`);
}
else
{
    mongoose.connect(`mongodb://${process.env.DEV_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
}

export const dbConnection = mongoose.connection;

export default dbConnection;
