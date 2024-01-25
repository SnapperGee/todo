import { typeDefs } from "./graphql/type-defs.js";
import { resolvers } from "./graphql/resolvers.js";
import { app } from "./server.js";
import db from "./connection.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

export interface ApolloContext {readonly user?: {readonly _id: string}}

const apolloServer = new ApolloServer<Readonly<ApolloContext>>({
    typeDefs,
    resolvers,
});

await apolloServer.start();

app.use('/graphql', expressMiddleware(apolloServer));

try
{
    await db.startSession();
}
catch (error)
{
    console.error(`%s\n\nDatabase connection error.`, error);
}

if (process.env.NODE_ENV === "development")
{
    app.listen(process.env.PORT, () =>
    {
        console.log(
            `DB connected to mongodb://${db.host}:${db.port}/${db.name}\nExpress server listening on http://127.0.0.1:${process.env.PORT}`);
    });
}
else
{
    app.listen(process.env.PORT);
}
