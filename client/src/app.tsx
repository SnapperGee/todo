import HeaderNav from "./component/header-nav";
import Footer from "./component/footer";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

const graphQlHttpLink = createHttpLink({uri: "/graphql"});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

const client = new ApolloClient({
    link: authLink.concat(graphQlHttpLink),
    cache: new InMemoryCache(),
});

const App = () =>
(
    <ApolloProvider client={client}>
        <header>
            <HeaderNav />
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <Footer />
        </footer>
    </ApolloProvider>
);

export default App;
