import { taskSchema, ITask } from "./task.js";
import { Schema, Model, model, Types, UpdateQuery } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser
{
    username: string;
    password: string;
    tasks: Types.DocumentArray<ITask>;
    accomplishedTasks: Types.DocumentArray<ITask>;
    pendingTasks: Types.DocumentArray<ITask>;
}

export interface IUserMethods
{
    isCorrectPassword(aString: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

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

userSchema.pre("save", async function()
{
    if (this.isNew || this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.pre<UpdateQuery<typeof userSchema>>("findOneAndUpdate", async function(next) {
    const update = this.getUpdate();
    if (update.password)
    {
        update.password = await bcrypt.hash(update.password, 10);
    }
    next();
});

userSchema.pre("insertMany", async function(_next, docs)
{
    for (const doc of docs)
    {
        doc.password = await bcrypt.hash(doc.password, 10);
    }
});

userSchema.methods.isCorrectPassword = async function (aString: string) {
    return bcrypt.compare(aString, this.password);
};

userSchema.virtual("accomplishedTasks").get(function() {
    return this.tasks.filter(task => task.accomplished);
});

userSchema.virtual("pendingTasks").get(function() {
    return this.tasks.filter(task => ! task.accomplished);
});

export const User = model<IUser, UserModel>("User", userSchema);

export default User;
