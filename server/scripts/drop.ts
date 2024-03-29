import db from "../src/main/ts/connection.js";

try
{
    console.log("Dropping database...");
    await db.dropDatabase();
    console.log("Database dropped.");
}
catch (error)
{
    console.error(error);
}
finally
{
    console.log("Closing database connection...");
    await db.close();
    console.log("Database connection closed.");
}
