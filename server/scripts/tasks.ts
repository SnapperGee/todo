import users from "./users.js";
import { Types } from "mongoose";

export const blogs = Object.freeze(users.map(user =>
    Object.freeze({
        _id: new Types.ObjectId(),
        title: `${user.name}'s Blog`,
        description: Math.random() >= 0.5 ? `Blog created by ${user.name}.` : null,
        userId: user.id
    })
));

export default blogs;
