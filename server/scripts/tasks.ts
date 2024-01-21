import users from "./users.js";
import { ISubtask } from "./subtasks.js";
import { Types } from "mongoose";

export interface ITask
{
    _id: Types.ObjectId;
    user: Types.ObjectId;
    title: string;
    accomplished: boolean;
    schedule: Date;
    subtasks: ISubtask[];
}

export const tasks: ITask[] = users.filter(() => [1,2,3,4,5][Math.floor(Math.random() * 5)] % 2 !== 0).reduce((acc: ITask[], user) =>
    {
        for (let iteration = Math.floor(Math.random() * 7); iteration > 0; --iteration)
        {
            acc.push({
                _id: new Types.ObjectId(),
                user: user._id,
                title: `${user.username}'s task ${iteration}`,
                accomplished: Math.random() >= 0.5,
                schedule: new Date(Math.random() * Date.now()),
                subtasks: []
            });
        }

        return acc;
    },
    []
);

export default tasks;
