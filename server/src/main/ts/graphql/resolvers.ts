import { User, IUser } from "../model/user.js";
import { Task, ITask } from "../model/task.js";
import { Context, signToken } from "../auth.js";
import { GraphQLError } from "graphql";

export const resolvers =
{
    Query:
    {
        user: async (_parent: unknown, {id}: {id: string}): Promise<typeof User | null> =>
            await User.findById(id).populate("tasks"),

        loggedInUser: async (_parent: unknown, _args: unknown, context: Context): Promise<typeof User | null> =>
        {
            if (context.user)
            {
                return await User.findById(context.user._id).populate("tasks")
            }

            throw new GraphQLError(`${resolvers.Query.loggedInUser.name}: Not logged in`, {extensions: {code: "UNAUTHORIZED"}});
        },

        task: async (_parent: unknown, {id}: {id: string}): Promise<typeof Task | null> =>
            await Task.findById(id).populate("user"),

        tasks: async (_parent: unknown, {id}: {id: string}): Promise<ITask[] | undefined> =>
            await Task.find({user: id}).populate("user"),

        tasksOfLoggedInUser: async (_parent: unknown, _args: unknown, context: Context): Promise<ITask[] | undefined> =>
        {
            if (context.user)
            {
                return await Task.find({user: context.user._id}).populate("user")
            }

            throw new GraphQLError(`${resolvers.Query.tasksOfLoggedInUser.name}: Not logged in`, {extensions: {code: "UNAUTHORIZED"}});
        }
    },

    Mutation:
    {
        login: async (_parent: unknown, {username, password}: {username: string, password: string}): Promise<{token: string, user: IUser}> =>
        {
            const user = await User.findOne({username});

            if ( ! user)
            {
                throw new GraphQLError(`${resolvers.Mutation.login.name}: User not found`, {extensions: {code: "USERNOTFOUND"}});
            }

            if ( ! await user.isCorrectPassword(password))
            {
                throw new GraphQLError(`${resolvers.Mutation.login.name}: Invalid password`, {extensions: {code: "PASSWORDAUTH"}});
            }

            const token = signToken(user._id, user.username);
            return {token, user};
        },

        createUser: async (_parent: unknown, {username, password}: {username: string, password: string}): Promise<{token: string, user: IUser}> =>
        {
            const user = await User.create({username, password})
            const token = signToken(user._id, user.username);
            return {token, user}
        },

        createTask: async (_parent: unknown, {title, schedule}: {title: string, schedule: string}, context: Context): Promise<ITask> =>
        {
            if (context.user)
            {
                return await Task.create({user: context.user._id, title, schedule});
            }

            throw new GraphQLError(`${resolvers.Mutation.createTask.name}: Forbidden operation.`, {extensions: {code: "UNAUTHORIZED", http: {status: 401}}});
        },

        deleteUser: async (_parent: unknown, {id}: {id: string}): Promise<IUser | null> =>
            await User.findByIdAndDelete(id),

        deleteTask: async (_parent: unknown, {id}: {id: string}): Promise<ITask | null> =>
            await Task.findByIdAndDelete(id),

        setUsername: async (_parent: unknown, {id, username}: {id: string, username: string}): Promise<typeof User | null> =>
            await User.findByIdAndUpdate(id, {username}, {new: true, runValidators: true}),

        setPassword: async (_parent: unknown, {id, password}: {id: string, password: string}): Promise<typeof User | null> =>
            await User.findByIdAndUpdate(id, {password}, {new: true, runValidators: true}),

        setLoggedInUsername: async (_parent: unknown, {username}: {username: string}, context: Context): Promise<typeof User | null> =>
        {
            if (context.user)
            {
                return await User.findByIdAndUpdate(context.user._id, {username}, {new: true})
            }

            throw new GraphQLError(`${resolvers.Mutation.setLoggedInUsername.name}: Not logged in`, {extensions: {code: "UNAUTHORIZED"}});
        },

        setLoggedInUserPassword: async (_parent: unknown, {password}: {password: string}, context: Context): Promise<typeof User | null> =>
            await User.findByIdAndUpdate(context.user?._id, {password}, {new: true, runValidators: true}),

        setTaskTitle: async (_parent: unknown, {id, title}: {id: string, title: string}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {title}, {new: true, runValidators: true}),

        setTaskAccomplished: async (_parent: unknown, {id, accomplished}: {id: string, accomplished: boolean}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {accomplished}, {new: true, runValidators: true})
    }
  };

  export default resolvers;
