import tasks from "./tasks.js";
import { Types } from "mongoose";

export interface ISubtask
{
    task: Types.ObjectId;
    title: string;
    accomplished: boolean;
}

export const subtasks: ISubtask[] = tasks.filter(() => [1,2,3,4,5][Math.floor(Math.random() * 5)] % 2 !== 0).reduce((acc: ISubtask[], task, index) =>
    {
        for (let iteration = Math.floor(Math.random() * 7); iteration > 0; --iteration)
        {
            acc.push({
                task: task._id,
                title: `${task.title} subtask ${iteration}`,
                accomplished: Math.random() >= 0.5
            });
        }

        return acc;
    },
    []
);

export default subtasks;
