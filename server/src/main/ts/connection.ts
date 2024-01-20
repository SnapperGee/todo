import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

export const dbConnection = mongoose.connection;

if (process.env.NODE_ENV === "development")
{
    console.log(`DB connected to: ${dbConnection.host}:${dbConnection.port}/${dbConnection.name}`);
}

export default dbConnection;
