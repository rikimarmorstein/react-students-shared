import { Outlet } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import Main from "../Main/Main";
import Logout from "../../AdminArea/Logout/Logout";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                {window.location.href.indexOf("/admin")>-1 ?  <Logout/> : <AuthMenu />}
                <Header />
              </header>
            <aside>
                <Menu />
            </aside>
            <main>
                <Main/>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
