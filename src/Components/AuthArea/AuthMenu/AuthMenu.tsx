import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";

import authService from "../../../Services/AuthService";
import { FaUserCircle } from "react-icons/fa";
import { CgUserList } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import "./AuthMenu.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import store from "../../../Redux/Store";
import { logoutAction } from "../../../Redux/SchoolDirectorState";

function AuthMenu(): JSX.Element {


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
        <div className="AuthMenu">
            {!user && 
                <>
                    <span >{}
                        <NavLink to="/login" title="Login"> <CgUserList className="login" /></NavLink></span>
                </>
            }
            {user &&
                <>
                    <span >
                        {/* {user.clientType === "CUSTOMER" && <NavLink id="details" to="/customerDetails"><FaUserCircle title="Customer details" /></NavLink>}{user.clientType === "COMPANY" && <NavLink id="details" to="/companyDetails"><FaUserCircle title="Company details" /></NavLink>} */}
                        Hello {user.name} | </span>
                    <NavLink to="" onClick={logout} id="logout">Logout <FiLogOut className="out" /></NavLink>
                </>}
                {/* {isLoggedIn ?  <>fdfsf</>:<>xxxfdfsf</>} */}

        </div>
    );
}

export default AuthMenu;
