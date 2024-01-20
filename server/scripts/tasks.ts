import users from "./users.js";
import { Types } from "mongoose";

export const tasks = users.filter(() => Math.random() >= 0.5).map((user, index) =>
    ({
        _id: new Types.ObjectId(),
        user: user._id,
        title: `${user.username}'s task ${index}`,
        accomplished: Math.random() >= 0.5,
        schedule: new Date(Math.random() * Date.now())
    })
);

export default tasks;
