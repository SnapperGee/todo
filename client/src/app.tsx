import HeaderNav from "./component/header-nav";
import Footer from "./component/footer";
import { Outlet } from "react-router-dom";

const App = () =>
(
    <>
        <header>
            <HeaderNav />
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <Footer />
        </footer>
    </>
);

export default App;
