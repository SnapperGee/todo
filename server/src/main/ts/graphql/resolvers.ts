import { User, IUser } from "../model/user.js";
import { Task, ITask } from "../model/task.js";
import { ISubtask } from "../model/subtask.js";
import { Types } from "mongoose";

export const resolvers =
{
    Query:
    {
        user: async (_parent: unknown, {id}: {id: string}): Promise<typeof User | null> =>
            await User.findById(id),

        task: async (_parent: unknown, {id}: {id: string}): Promise<typeof Task | null> =>
            await Task.findById(id).populate("user"),

        tasks: async (_parent: unknown, {id}: {id: string}): Promise<Types.DocumentArray<ITask> | undefined> =>
            (await User.findById(id))?.tasks,

        subtask: async (_parent: unknown, {userId: taskId, subtaskId}: {userId: string, subtaskId: string}): Promise<ISubtask | null | undefined> =>
            (await Task.findById(taskId))?.subtasks.id(subtaskId),

        subtasks: async (_parent: unknown, {id}: {id: string}): Promise<Types.DocumentArray<ISubtask> | undefined> =>
            (await Task.findById(id))?.subtasks
    },

    Mutation:
    {
        createUser: async (_parent: unknown, {username, password}: {username: string, password: string}): Promise<IUser> =>
            await User.create({username, password}),

        createTask: async (_parent: unknown, {userId, title, schedule}: {userId: string, title: string, schedule: string}): Promise<ITask> =>
            await Task.create({user: userId, title, schedule}),

        createSubtask: async (_parent: unknown, {taskId, title}: {taskId: string, title: string}): Promise<ITask | null> =>
        {
            return await Task.findByIdAndUpdate(
                taskId,
                { $push: {subtasks: {title}} },
                { new: true }
            );
        },

        deleteUser: async (_parent: unknown, {id}: {id: string}): Promise<IUser | null> =>
        {
            const deletedUser = await User.findByIdAndDelete(id);
            await Task.deleteMany({user: deletedUser?._id});
            return deletedUser;
        },

        deleteTask: async (_parent: unknown, {id}: {id: string}): Promise<ITask | null> =>
        {
            const deletedTask = await Task.findByIdAndDelete(id);
            await User.findByIdAndUpdate(deletedTask?.user, { $pull: {tasks: deletedTask?._id} });
            return deletedTask;
        },

        deleteSubtask: async (_parent: unknown, {taskId, subtaskId}: {taskId: string, subtaskId: string}): Promise<ISubtask | undefined> =>
            (await Task.findById(taskId))?.subtasks.id(subtaskId)?.deleteOne(),

        setUsername: async (_parent: unknown, {id, username}: {id: string, username: string}): Promise<typeof User | null> =>
            await User.findByIdAndUpdate(id, {username}, {new: true}),

        setTaskTitle: async (_parent: unknown, {id, title}: {id: string, title: string}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {title}, {new: true}),

        setSubtaskTitle: async (_parent: unknown, {taskId, subtaskId, title}: {taskId: string, subtaskId: string, title: string}): Promise<ISubtask | undefined> =>
            (await Task.findById(taskId))?.subtasks.id(subtaskId)?.set({title}),

        setTaskAccomplished: async (_parent: unknown, {id, accomplished}: {id: string, accomplished: boolean}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {accomplished}, {new: true}),

        setSubtaskAccomplished: async (_parent: unknown, {taskId, subtaskId, accomplished}: {taskId: string, subtaskId: string, accomplished: boolean}): Promise<ISubtask | undefined> =>
            (await Task.findById(taskId))?.subtasks.id(subtaskId)?.set({accomplished})
    }
  };

  export default resolvers;
