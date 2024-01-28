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
        user(id: ID!): User
        task(id: ID!): Task
        tasks(id: ID!): [Task]

        loggedInUser: User
        tasksOfLoggedInUser: [Task]
    }

    type Mutation
    {
        createUser(username: String!, password: String!): Auth!
        deleteUser(id: ID!): User
        deleteTask(id: ID!): Task
        setUsername(id: ID!, username: String!): User
        setPassword(id: ID!, password: String!): User
        setTaskTitle(id: ID!, title: String!): Task
        setTaskAccomplished(id: ID!, accomplished: Boolean!): Task

        login(username: String!, password: String!): Auth
        createTask(title: String!, schedule: String!): Task
        setLoggedInUsername(username: String!): User
        setLoggedInUserPassword(password: String!): User
    }
`;

export default typeDefs;
