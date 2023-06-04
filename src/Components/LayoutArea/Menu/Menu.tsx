import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";
import ClientType from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import { FaHome } from "react-icons/fa";

function Menu(): JSX.Element {
    const [clientType, setClientType] = useState<ClientType>();

    useEffect(() => {
        setClientType(store.getState().authState.user?.clientType);
        const unsubscribe = store.subscribe(() => {
            setClientType(store.getState().authState.user?.clientType);

        });
        return unsubscribe;

    }, []);


    return (
        <div className="Menu">
            {clientType === undefined && <>

                <NavLink to="/home">  דף הבית</NavLink>    <span> | </span>
                <NavLink to="/about">אודות</NavLink>

            </>}

            {clientType === ClientType.SCHOOL && <>

                <NavLink to="/school-home">דף הבית <FaHome /> </NavLink>  <span> | </span>
                <NavLink to="/about">אודות</NavLink> <span> | </span>
                <NavLink to="/add-student">הוספת תלמיד</NavLink><span> | </span>
                {/* <NavLink to="">כל התלמידים</NavLink><span> */}
                    {/* <NavLink to="/add-student">הוספת מורה</NavLink><span> | </span>
                    <NavLink to="">כל המורים</NavLink><span> */}

                    {/* </span> */}
                </>}


            </div>
            );
}

            export default Menu;
