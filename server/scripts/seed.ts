import users from "./users.js";
import tasks from "./tasks.js";
import subtasks from "./subtasks.js";
import User from "../src/main/ts/model/user.js";
import Task from "../src/main/ts/model/task.js";
import Subtask from "../src/main/ts/model/subtask.js";
import db from "../src/main/ts/connection.js";

for (const subtask of subtasks)
{
    tasks.find(task => task._id.equals(subtask.task))?.subtasks.push(subtask);
}

for (const task of tasks)
{
    users.find(user => user._id.equals(task.user))?.tasks.push(task);
}

db.once("open", async () =>
{
    await Subtask.insertMany(subtasks);
    await Task.insertMany(tasks);
    await User.insertMany(users);
    await db.close();
});
