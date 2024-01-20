import { Schema, model } from "mongoose";

export const subtaskSchema = new Schema(
    {
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

export const Subtask = model("Subtask", subtaskSchema);

export default Subtask;
