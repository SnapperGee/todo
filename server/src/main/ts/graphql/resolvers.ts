import { User, IUser } from "../model/user.js";
import { Task, ITask } from "../model/task.js";

export const resolvers =
{
    Query:
    {
        user: async (_parent: unknown, {id}: {id: string}): Promise<typeof User | null> =>
            await User.findById(id).populate("tasks"),

        loggedInUser: async (_parent: unknown, _args: unknown, context: {user: {_id: string}}): Promise<typeof User | null> =>
            await User.findById(context.user._id).populate("tasks"),

        task: async (_parent: unknown, {id}: {id: string}): Promise<typeof Task | null> =>
            await Task.findById(id).populate("user"),

        tasks: async (_parent: unknown, {id}: {id: string}): Promise<ITask[] | undefined> =>
            await Task.find({user: id}).populate("user")
    },

    Mutation:
    {
        createUser: async (_parent: unknown, {username, password}: {username: string, password: string}): Promise<IUser> =>
            await User.create({username, password}),

        createTask: async (_parent: unknown, {userId, title, schedule}: {userId: string, title: string, schedule: string}): Promise<ITask> =>
        {
            const createdTask = await Task.create({user: userId, title, schedule});
            User.findByIdAndUpdate(createdTask.user, { $push: {tasks: createdTask} });
            return createdTask;
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

        setUsername: async (_parent: unknown, {id, username}: {id: string, username: string}): Promise<typeof User | null> =>
            await User.findByIdAndUpdate(id, {username}, {new: true}),

        setTaskTitle: async (_parent: unknown, {id, title}: {id: string, title: string}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {title}, {new: true}),

        setTaskAccomplished: async (_parent: unknown, {id, accomplished}: {id: string, accomplished: boolean}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {accomplished}, {new: true})
    }
  };

  export default resolvers;
