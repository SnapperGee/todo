import HeaderNav from "./component/header-nav";
import Footer from "./component/footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from "react-router-dom";

const client = new ApolloClient({
    uri: '/graphql',
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
