export const typeDefs =
`
    type User
    {
        _id: ID!
        username: String!
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
        user(id: ID!): User
        task(id: ID!): Task
        tasks(id: ID!): [Task]
    }

    type Mutation
    {
        createUser(username: String!, password: String!): User!
        createTask(userId: ID!, title: String!, schedule: String!): Task
        deleteUser(id: ID!): User
        deleteTask(id: ID!): Task
        setUsername(id: ID!, username: String!): User
        setPassword(id: ID!, password: String!): User
        setTaskTitle(id: ID!, title: String!): Task
        setTaskAccomplished(id: ID!, accomplished: Boolean!): Task
    }
`;

export default typeDefs;
