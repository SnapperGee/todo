/**
 * This module contains the Task model and its schema. A Task represents a task
 * that a {@link user} can schedule and accomplish.
 *
 * @module task
 *
 * @see {@link user}
 */

import { User } from "./user.js";
import { Schema, model, Types, UpdateQuery } from "mongoose";

/**
 * The interface for the Task {@link taskSchema schema} and {@link Task model}.
 *
 * @see {@link taskSchema}
 * @see {@link Task}
 */
export interface ITask
{
    /**
     * The {@link user.userSchema User} that owns the task.
     */
    user: Types.ObjectId;

    /**
     * The title string of the task.
     */
    title: string;

    /**
     * A boolean value that indicates whether the task has been accomplished or not.
     */
    accomplished: boolean;

    /**
     * The date when the task is scheduled to be accomplished.
     */
    schedule: Date;
}

/**
 * The schema for the {@link Task Task model}. Contains the following fields:
 *
 * - user: The {@link user.userSchema User} that owns the task.
 * - title: The title string of the task.
 * - accomplished: A boolean value that indicates whether the task has been accomplished or not.
 * - schedule: The date when the task is scheduled to be accomplished.
 *
 * This schema contains middleware that adds the task to the user's tasks array
 * upon creation, and removes the task from the user's tasks array upon deletion.
 *
 * @see {@link ITask}
 * @see {@link Task}
 */
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

// Add task to the user's tasks array when task is created.
taskSchema.post("save", async function()
{
    await User.findByIdAndUpdate(this.user, { $push: {tasks: this} });
});

// Delete the task from the user's tasks array when task is deleted via query.
taskSchema.pre<UpdateQuery<typeof taskSchema>>("findOneAndDelete", async function() {
    const deletedTask = await this.model.findOne(this.getFilter());
    await User.findByIdAndUpdate(deletedTask?.user, { $pull: {tasks: {_id: deletedTask?._id}} });
});

taskSchema.pre<UpdateQuery<typeof taskSchema>>("deleteOne", async function() {
    const deletedTask = await this.model.findOne(this.getFilter());
    await User.findByIdAndUpdate(deletedTask?.user, { $pull: {tasks: {_id: deletedTask?._id}} });
});

// Delete the task from the user's tasks array when task is deleted via document.
taskSchema.pre("deleteOne", {document: true, query: false}, async function() {
    await User.findByIdAndUpdate(this.user, { $pull: {tasks: {_id: this._id}} });
});

/**
 * The Task model of the {@link taskSchema}. Contains the following fields:
 *
 * - user: The user that owns the task. References a User document.
 * - title: The title string of the task.
 * - accomplished: A boolean value that indicates whether the task has been accomplished or not.
 * - schedule: The date when the task is scheduled to be accomplished.
 *
 * @see {@link taskSchema}
 * @see {@link ITask}
 */
export const Task = model<ITask>("Task", taskSchema);

export default Task;
