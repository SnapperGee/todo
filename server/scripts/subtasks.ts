import tasks from "./tasks.js";

export const subtasks = tasks.filter(() => Math.random() >= 0.5).map((task, index) =>
    ({
        task: task._id,
        title: `${task.title} subtask (${index})`,
        accomplished: Math.random() >= 0.5
    })
);

export default subtasks;
