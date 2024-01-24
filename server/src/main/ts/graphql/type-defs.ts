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
    }

    type Query
    {
        user(userId: ID!): User
        task(taskId: ID!): Task
        tasks(userId: ID!): [Task]
    }

    type Mutation
    {
        createUser(username: String!, password: String!): User!
        createTask(userId: ID!, title: String!, schedule: String!): Task!
        deleteUser(userId: ID!): User
        deleteTask(taskId: ID!): Task
        setUsername(userId: ID!, username: String!): User
        setTaskTitle(taskId: ID!, title: String!): Task
        setTaskAccomplished(taskId: ID!, accomplished: Boolean!): Task
    }
`;

export default typeDefs;
