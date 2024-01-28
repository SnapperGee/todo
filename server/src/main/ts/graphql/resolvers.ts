import { User, IUser } from "../model/user.js";
import { Task, ITask } from "../model/task.js";
import { Context, signToken } from "../auth.js";
import { GraphQLError } from "graphql";

export const resolvers =
{
    Query:
    {
        user: async (_parent: unknown, _args: unknown, context: Context): Promise<typeof User | null> =>
        {
            if (context.user)
            {
                return await User.findById(context.user._id).populate("tasks");
            }

            throw new GraphQLError(`${resolvers.Query.user.name}: Forbidden operation`, {extensions: {code: "FORBIDDEN", http: {status: 401}}});
        },

        task: async (_parent: unknown, {id}: {id: string}, context: Context): Promise<ITask | null> =>
        {
            if (context.user)
            {
                const task = await Task.findById(id).populate("user");

                if ( ! task)
                {
                    throw new GraphQLError(`${resolvers.Query.task.name}: Task not found`, {extensions: {code: "NOTFOUND", http: {status: 404}}});
                }
                else if (task.user.equals(context.user._id))
                {
                    return task;
                }
            }

            throw new GraphQLError(`${resolvers.Query.task.name}: Forbidden operation`, {extensions: {code: "FORBIDDEN", http: {status: 401}}});
        },

        tasks: async (_parent: unknown, _args: unknown, context: Context): Promise<ITask[] | undefined> =>
        {
            if (context.user)
            {
                return await Task.find({user: context.user._id}).populate("user");
            }

            throw new GraphQLError(`${resolvers.Query.tasks.name}: Forbidden operation.`, {extensions: {code: "FORBIDDEN", http: {status: 401}}});
        }
    },

    Mutation:
    {
        login: async (_parent: unknown, {username, password}: {username: string, password: string}): Promise<{token: string, user: IUser}> =>
        {
            const user = await User.findOne({username}).populate("tasks");

            if ( ! user)
            {
                throw new GraphQLError(`${resolvers.Mutation.login.name}: Invalid username password combo.`, {extensions: {code: "INVALIDUSERCREDENTIALS", http: {status: 401}}});
            }

            if ( ! await user.isCorrectPassword(password))
            {
                throw new GraphQLError(`${resolvers.Mutation.login.name}: Invalid username password combo.`, {extensions: {code: "INVALIDUSERCREDENTIALS", http: {status: 401}}});
            }

            const token = signToken(user._id, user.username);
            return {token, user};
        },

        createUser: async (_parent: unknown, {username, password}: {username: string, password: string}): Promise<{token: string, user: IUser}> =>
        {
            const user = await User.create({username, password});
            const token = signToken(user._id, user.username);
            return {token, user}
        },

        createTask: async (_parent: unknown, {title, schedule}: {title: string, schedule: string}, context: Context): Promise<ITask> =>
        {
            if (context.user)
            {
                return await Task.create({user: context.user._id, title, schedule});
            }

            throw new GraphQLError(`${resolvers.Mutation.createTask.name}: Forbidden operation.`, {extensions: {code: "FORBIDDEN", http: {status: 401}}});
        },

        deleteUser: async (_parent: unknown, _args: unknown, context: Context): Promise<IUser | null> =>
        {
            if (context.user)
            {
                return  await User.findByIdAndDelete(context.user._id).populate("tasks");
            }

            throw new GraphQLError(`${resolvers.Mutation.deleteUser.name}: Forbidden operation.`, {extensions: {code: "FORBIDDEN", http: {status: 401}}});
        },

        deleteTask: async (_parent: unknown, {id}: {id: string}, context: Context): Promise<ITask | null> =>
            {
                if (context.user)
                {
                    const taskToDelete = await Task.findById(id);

                    if (taskToDelete?.user.equals(context.user._id))
                    {
                        return await Task.findByIdAndDelete(taskToDelete._id).populate("user");
                    }
                }

                throw new GraphQLError(`${resolvers.Mutation.deleteTask.name}: Forbidden operation.`, {extensions: {code: "FORBIDDEN", http: {status: 401}}});
            },

        setUsername: async (_parent: unknown, {username}: {username: string}, context: Context): Promise<typeof User | null> =>
        {
            if (context.user)
            {
                return await User.findByIdAndUpdate(context.user._id, {username}, {new: true, runValidators: true}).populate("tasks");
            }

            throw new GraphQLError(`${resolvers.Mutation.setUsername.name}: Forbidden operation.`, {extensions: {code: "UNAUTHORIZED", http: {status: 401}}});
        },

        setPassword: async (_parent: unknown, {password}: {password: string}, context: Context): Promise<typeof User | null> =>
        {
            if (context.user)
            {
                return await User.findByIdAndUpdate(context.user?._id, {password}, {new: true, runValidators: true}).populate("tasks");
            }

            throw new GraphQLError(`${resolvers.Mutation.setPassword.name}: Forbidden operation.`, {extensions: {code: "UNAUTHORIZED", http: {status: 401}}});
        },

        setTaskTitle: async (_parent: unknown, {title}: {id: string, title: string}, context: Context): Promise<typeof Task | null> =>
        {
            if (context.user)
            {
                return await Task.findByIdAndUpdate(context.user?._id, {title}, {new: true, runValidators: true}).populate("user");
            }

            throw new GraphQLError(`${resolvers.Mutation.setTaskTitle.name}: Forbidden operation.`, {extensions: {code: "UNAUTHORIZED", http: {status: 401}}});
        },

        setTaskAccomplished: async (_parent: unknown, {id, accomplished}: {id: string, accomplished: boolean}): Promise<typeof Task | null> =>
            await Task.findByIdAndUpdate(id, {accomplished}, {new: true, runValidators: true}).populate("user")
    }
  };

  export default resolvers;
