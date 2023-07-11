import { useEffect, useState } from "react";
import "./Logout.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import { NavLink } from "react-router-dom";
import { CgUserList } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
function Logout(): JSX.Element {
    const [user, setUser] = useState<CredentialsModel>();
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(store.getState().authState?.token?.length > 0);

    // useEffect(() => {
    //     store.subscribe(() => {
    //         setIsLoggedIn(store.getState().authState?.token?.length > 0)
    //          })
    // }, [])
    useEffect(() => {

        setUser(store.getState().authState.user); // First update

        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user); // Any other update
        });

        // Will be called when component destroyed
        return unsubscribe; // Stop listening

    }, []);

    function logout(): void {
        authService.logout();
        // store.dispatch(logoutAction());


    }

    return (
        <div className="Logout">
			  {!user &&
                <>
                    <span >{ }
                        <NavLink to="/admin-login" title="Login"> <CgUserList className="login" /></NavLink></span>
                </>
            }
            {user &&
                <>
                    <span >
                        {/* {user.clientType === "CUSTOMER" && <NavLink id="details" to="/customerDetails"><FaUserCircle title="Customer details" /></NavLink>}{user.clientType === "COMPANY" && <NavLink id="details" to="/companyDetails"><FaUserCircle title="Company details" /></NavLink>} */}
                        שלום {user.name}| </span>
                    <NavLink to="" onClick={logout} id="logout">Logout <FiLogOut className="out" /></NavLink>
                </>}
        </div>
    );
}

export default Logout;
