import { User } from "./user.js";
import { Schema, model, Types, UpdateQuery } from "mongoose";

export interface ITask
{
    user: Types.ObjectId;
    title: string;
    accomplished: boolean;
    schedule: Date;
}

export const taskSchema = new Schema<ITask>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required."]
        },
        title: {
            type: String,
            required: [true, "Task title is required."],
            trim: true,
            minlength: [1, "Task title must contain a character."],
            validate: {
                validator: async (taskTitle: string) => {
                    return taskTitle.trim().length !== 0;
                },
                message: "Task title can't be blank."
            }
        },
        accomplished: {
            type: Boolean,
            default: false
        },
        schedule: {
            type: Date,
            required: [true, "Task schedule is required."]
        }
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

taskSchema.post("save", async function()
{
    await User.findByIdAndUpdate(this.user, { $push: {tasks: this} });
});

taskSchema.pre<UpdateQuery<typeof taskSchema>>("findOneAndDelete", async function() {
    const deletedTask = await this.model.findOne(this.getFilter());
    await User.findByIdAndUpdate(deletedTask?.user, { $pull: {tasks: {_id: deletedTask?._id}} });
});

export const Task = model<ITask>("Task", taskSchema);

export default Task;
