/**
 * This module contains the User model and its schema. A User has tasks that can
 * be scheduled and accomplished.
 *
 * @module user
 *
 * @see {@link task}
 */

import { taskSchema, ITask, Task } from "./task.js";
import { Schema, Model, model, Types, UpdateQuery } from "mongoose";
import bcrypt from "bcrypt";

/**
 * The interface for the User {@link userSchema schema} and {@link User model}.
 *
 * @see {@link userSchema}
 * @see {@link User}
 */
export interface IUser
{
    /**
     * The username string of the user.
     */
    username: string;

    /**
     * The hashed password string of the user.
     */
    password: string;

    /**
     * The array of {@link task.taskSchema Task} subdocuments of the user.
     */
    tasks: Types.DocumentArray<ITask>;

    /**
     * The array of {@link task.taskSchema Task} subdocuments of the user that
     * have been accomplished.
     */
    accomplishedTasks: Types.DocumentArray<ITask>;

    /**
     * The array of {@link task.taskSchema Task} subdocuments of the user that
     * are pending (have not been accomplished).
     */
    pendingTasks: Types.DocumentArray<ITask>;
}

interface IUserMethods
{
    isCorrectPassword(aString: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

/**
 * The schema for the {@link User User model}. Contains the following fields:
 *
 * - username: A username string.
 * - password: A hashed password string.
 * - tasks: An array of {@link task.taskSchema Task} subdocuments.
 *
 * @see {@link IUser}
 * @see {@link User}
 */
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        username: {
            type: String,
            required: [true, "Username is required."],
            unique: true,
            trim: true,
            minlength: [1, "Username must contain a 1 character."],
            validate: {
                validator: async (username: string) => {
                    return username.length !== 0 && ! /\s/.test(username);
                },
                message: ({value}) => `${value} must contain a character and can't contain whitespace.`
            }
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must be at least 8 characters."]
        },
        tasks: {
            type: [taskSchema],
            default: []
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Hash the password string before saving it to the database.
userSchema.pre("save", async function()
{
    if (this.isNew || this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// Hash the new password string before updating the database.
userSchema.pre<UpdateQuery<typeof userSchema>>("findOneAndUpdate", async function() {
    const update = this.getUpdate();
    if (update.password)
    {
        update.password = await bcrypt.hash(update.password, 10);
    }
});

// Hash the password strings before inserting them into the database.
userSchema.pre("insertMany", async function(_next, docs)
{
    for (const doc of docs)
    {
        doc.password = await bcrypt.hash(doc.password, 10);
    }
});

// Delete the user's tasks when the user is deleted.
userSchema.pre<UpdateQuery<typeof userSchema>>("findOneAndDelete", async function() {
    const deletedUser = await this.model.findOne(this.getFilter());
    await Task.deleteMany({user: deletedUser?._id});
});

// Return true if the password string matches the stored hashed password string.
userSchema.methods.isCorrectPassword = async function (aString: string) {
    return bcrypt.compare(aString, this.password);
};

// Return the user's accomplished tasks.
userSchema.virtual("accomplishedTasks").get(function() {
    return this.tasks.filter(task => task.accomplished);
});

// Return the user's pending (not accomplished) tasks.
userSchema.virtual("pendingTasks").get(function() {
    return this.tasks.filter(task => ! task.accomplished);
});

/**
 * The User model of the {@link userSchema}. Contains the following fields:
 *
 * - username: A username string.
 * - password: A hashed password string.
 * - tasks: An array of {@link task.taskSchema Task} subdocuments.
 *
 * @see {@link userSchema}
 * @see {@link IUser}
 */
export const User = model<IUser, UserModel>("User", userSchema);

export default User;
