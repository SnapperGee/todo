import { typeDefs } from "./schema/type-defs.js";
import { resolvers } from "./schema/resolvers.js";
import { app } from "./server.js";
import db from "./connection.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () =>
{
    await apolloServer.start();
    app.use('/graphql', expressMiddleware(apolloServer));

    db.once("open", () => {
        if (process.env.NODE_ENV === "development")
        {
            app.listen(process.env.PORT, () =>
            {
                console.log(
                    `DB connected to ${db.host}:${db.port}/${db.name}\nExpress server listening on http://127.0.0.1:${process.env.PORT}`);
            });
        }
        else
        {
            app.listen(process.env.PORT);
        }
    });
};

startApolloServer();
