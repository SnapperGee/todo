import users from "./users.js";
import tasks from "./tasks.js";
import User from "../src/main/ts/model/user.js";
import Task from "../src/main/ts/model/task.js";
import db from "../src/main/ts/connection.js";

for (const task of tasks)
{
    users.find(user => user._id.equals(task.user))?.tasks.push(task);
}

db.once("open", async () =>
{
    try
    {
        console.log("Seeding database...\nSeeding users...");
        await User.insertMany(users);

        console.log("Seeding tasks...");
        await Task.insertMany(tasks);

        console.log("Database seeded.");
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
});
