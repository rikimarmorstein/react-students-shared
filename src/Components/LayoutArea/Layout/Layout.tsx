import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
		 <header>
                <Header />
                <AuthMenu />
            </header>
            <aside>
                <Menu />
            </aside>
            <main>
                <Routing />
            </main>
            <footer>
                <Footer />
            </footer>	
        </div>
    );
}

export default Layout;
