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

    type DeleteResult
    {
        n: Int!
        ok: Int!
        deletedCount: Int!
    }

    type Query
    {
        user: User!
        tasks: [Task]!
        task(id: ID!): Task
    }

    type Mutation
    {
        login(username: String!, password: String!): Auth!
        createUser(username: String!, password: String!): Auth!
        createTask(title: String!, schedule: String!): Task!
        setUsername(username: String!): User!
        setPassword(password: String!): User!
        setTaskTitle(id: ID!, title: String!): Task!
        setTaskAccomplished(id: ID!, accomplished: Boolean!): Task
        deleteUser: User
        deleteTask(id: ID!): Task
        deleteTasks(ids: [ID]!): DeleteResult
    }
`;

export default typeDefs;
