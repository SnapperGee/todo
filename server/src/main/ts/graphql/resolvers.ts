import { User } from "../model/user.js";
import { Task } from "../model/task.js";
import { subtaskSchema, ISubtask } from "../model/subtask.js";
import { Types } from "mongoose";

export const resolvers =
{
    Query:
    {
        user: async (_parent: unknown, {id}: {id: string}): Promise<typeof User | null> =>
            await User.findById(id),

        task: async (_parent: unknown, {id}: {id: string}): Promise<typeof Task | null> =>
            await Task.findById(id),

        subtask: async (_parent: unknown, {userId: taskId, subtaskId}: {userId: string, subtaskId: string}): Promise<ISubtask | null | undefined> =>
            (await Task.findById(taskId))?.subtasks.id(subtaskId),

        subtasks: async (_parent: unknown, {id}: {id: string}): Promise<Types.DocumentArray<ISubtask> | undefined> =>
            (await Task.findById(id))?.subtasks
    },

    Mutation:
    {

    },
  };

  export default resolvers;
