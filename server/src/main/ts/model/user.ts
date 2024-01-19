import { taskSchema } from './task';
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
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
        tasks: [taskSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (aString: string) {
    return bcrypt.compare(aString, this.password);
};

userSchema.virtual("hasTasks").get(function (): boolean {
    return this.tasks.length !== 0;
});

userSchema.virtual("accomplishedTasks").get(function () {
    return this.tasks.filter(task => task.accomplished);
});

userSchema.virtual("pendingTasks").get(function () {
    return this.tasks.filter(task => ! task.accomplished);
});

export const User = model("User", userSchema);

export default User;
