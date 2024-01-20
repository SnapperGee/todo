import { subtaskSchema } from "./subtask";
import { Schema, model } from "mongoose";

export const taskSchema = new Schema(
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
        },
        subtasks: [subtaskSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

taskSchema.virtual("hasSubtasks").get(function(): boolean {
    return this.subtasks.length !== 0;
});

taskSchema.virtual("accomplishedSubtasks").get(function() {
    return this.subtasks.filter(subtask => subtask.accomplished);
});

taskSchema.virtual("pendingSubtasks").get(function() {
    return this.subtasks.filter(subtask => ! subtask.accomplished);
});

export const Task = model("Task", taskSchema);

export default Task;
