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

    type Auth
    {
        token: String!
        user: User!
    }

    type Query
    {
        user: User!
        tasks: [Task]!
        task(id: ID!): Task
    }

    type Mutation
    {
        deleteUser(id: ID!): User
        deleteTask(id: ID!): Task
        setTaskAccomplished(id: ID!, accomplished: Boolean!): Task

        createUser(username: String!, password: String!): Auth!
        login(username: String!, password: String!): Auth!
        setUsername(username: String!): User!
        setPassword(password: String!): User!
        createTask(title: String!, schedule: String!): Task!
        setTaskTitle(title: String!): Task!
    }
`;

export default typeDefs;
