import { User, IUser } from "../model/user.js";
import { Task, ITask } from "../model/task.js";
import { GraphQLError } from "graphql";

export const resolvers =
{
    Query:
    {
        user: async (_parent: unknown, {id}: {id: string}): Promise<typeof User | null> =>
            await User.findById(id).populate("tasks"),

        loggedInUser: async (_parent: unknown, _args: unknown, context: {user?: {_id: string}}): Promise<typeof User | null> =>
        {
            if (context.user)
            {
                await User.findById(context.user._id).populate("tasks")
            }

            throw new GraphQLError(`${resolvers.Query.loggedInUser.name}: Not logged in`, {extensions: {code: "UNAUTHORIZED"}});
        },

        task: async (_parent: unknown, {id}: {id: string}): Promise<typeof Task | null> =>
            await Task.findById(id).populate("user"),

        tasks: async (_parent: unknown, {id}: {id: string}): Promise<ITask[] | undefined> =>
            await Task.find({user: id}).populate("user"),

        tasksOfLoggedInUser: async (_parent: unknown, _args: unknown, context: {user?: {_id: string}}): Promise<ITask[] | undefined> =>
        {
            if (context.user)
            {
                await Task.find({user: context.user._id}).populate("user")
            }

            throw new GraphQLError(`${resolvers.Query.tasksOfLoggedInUser.name}: Not logged in`, {extensions: {code: "UNAUTHORIZED"}});
        }
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

        createLoggedInUserTask: async (_parent: unknown, {title, schedule}: {title: string, schedule: string}, context: {user?: {_id: string}}): Promise<ITask> =>
        {
            if (context.user)
            {
                const createdTask = await Task.create({user: context.user._id, title, schedule});
                User.findByIdAndUpdate(createdTask.user, { $push: {tasks: createdTask} });
                return createdTask;
            }

            throw new GraphQLError(`${resolvers.Mutation.createLoggedInUserTask.name}: Not logged in`, {extensions: {code: "UNAUTHORIZED"}});
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

        setLoggedInUsername: async (_parent: unknown, {username}: {username: string}, context: {user: {_id: string}}): Promise<typeof User | null> =>
        {
            if (context.user)
            {
                await User.findByIdAndUpdate(context.user._id, {username}, {new: true})
            }

            throw new GraphQLError(`${resolvers.Mutation.setLoggedInUsername.name}: Not logged in`, {extensions: {code: "UNAUTHORIZED"}});
        },

        setTaskTitle: async (_parent: unknown, {id, title}: {id: string, title: string}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {title}, {new: true}),

        setTaskAccomplished: async (_parent: unknown, {id, accomplished}: {id: string, accomplished: boolean}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {accomplished}, {new: true})
    }
  };

  export default resolvers;
