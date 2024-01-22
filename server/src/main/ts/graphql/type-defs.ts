export const typeDefs =
`
    type User
    {
        _id: ID!
        username: String!
        password: String!
        tasks: [Task]!
        accomplishedTasks: [Task]!
        pendingTasks: [Task]!
    }

    type Task
    {
        _id: ID!
        user: User!
        title: String!
        accomplished: Boolean!
        schedule: String!
        subtasks: [Subtask]!
        hasSubtasks: Boolean!
        accomplishedSubtasks: [Subtask]!
        pendingSubtasks: [Subtask]!
    }

    type Subtask
    {
        _id: ID!
        task: Task!
        title: String!
        accomplished: Boolean!
    }

    type Query
    {
        user(id: ID!): User!
        task(id: ID!): Task!
        tasks(id: ID!): [Task]!
        accomplishedTasks(id: ID!): [Task]!
        pendingTasks(id: ID!): [Task]!
        subtask(id: ID!): Subtask!
        subtasks(id: ID!): [Subtask]!
        accomplishedSubtasks(id: ID!): [Subtask]!
        pendingSubtasks(id: ID!): [Subtask]!
    }

    type Mutation
    {
        createUser(username: String!, password: String!): User!
        createTask(userId: ID!, title: String!, schedule: String!): Task!
        createSubtask(taskId: ID!, title: String!): Subtask!
        deleteUser(id: ID!): User!
        deleteTask(id: ID!): Task!
        deleteSubtask(taskId: ID!, subtaskId: ID!): Subtask!
        setUsername(id: ID!, username: String!): User!
        setTaskTitle(id: ID!, title: String!): Task!
        setSubtaskTitle(taskId: ID!, subtaskId: ID!, title: String!): Subtask!
        setTaskAccomplished(id: ID!, accomplished: Boolean!): Task!
        setSubtaskAccomplished(taskId: ID!, subtaskId: ID!, accomplished: Boolean!): Subtask!
    }
`;

export default typeDefs;
