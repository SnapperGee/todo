import { Schema } from "mongoose";

export const subtaskSchema = new Schema(
    {
        task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: [true, "Task is required."]
        },
        title: {
            type: String,
            required: [true, "Subtask title is required."],
            trim: true,
            minlength: [1, "Subtask title must contain a character."],
            validate: {
                validator: async (taskTitle: string) => {
                    return taskTitle.trim().length !== 0;
                },
                message: "Subtask title can't be blank."
            }
        },
        accomplished: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
