import { useEffect, useState } from "react";
import SchoolUserModel from "../../../Models/SchoolUserModel";
import store from "../../../Redux/Store";
import "./SchoolList.css";
import notify from "../../../Services/NotificationService"
import { BsFillTrash3Fill, BsFillPencilFill , BsPersonFillAdd} from "react-icons/bs";

import SchoolDirectorDetails from "../../SchoolDirectorArea/SchoolDirectorDetails/SchoolDirectorDetails";
import { NavLink, useNavigate } from "react-router-dom";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import { fetchSchoolAction } from "../../../Redux/SchoolDirectorState";
import adminService from "../../../Services/AdminService";
import SchoolDirectorCard from "../../SchoolDirectorArea/SchoolDirectorCard/SchoolDirectorCard";

function SchoolList(): JSX.Element {

    const [schools, setSchools] = useState<SchoolUserModel[]>(store.getState().schoolState.schools);

    const navigate = useNavigate();

    useEffect(() => {
        
        adminService.getAllSchools().then((res) => {
            setSchools(res);
            store.dispatch(fetchSchoolAction(res));
            console.log(schools);
            
        }).catch((error) => {
            notify.error(error);
        })
    }, []);

   

    return (
        <div className="SchoolList">
            <h1>בתי ספר</h1>
            {schools.length > 0 ? 
            <table>
                    {/* <thead> */}
                        <tr>
                            <th> שם  </th> 
                            <th> כתובת</th>
                            <th> סיסמא </th>
                        </tr>
                    {/* </thead>
                    <tbody> */}
                        {schools.map((school) => (
                            <tr>
                                <td> {school.schoolName} </td>
                                <td> {school.address} </td>
                                <td> {school.password} </td>
                                <td> <NavLink to={"/admin-home/update-school/"+ school.id}><BsFillPencilFill /></NavLink></td>
                                <td> <NavLink to={"/admin-home/delete-school/"+ school.id}><BsFillTrash3Fill /></NavLink></td>
                            </tr>
                        ))}
                    {/* </tbody> */}
                </table>
           : <span>no schools yet 😒</span>}

        </div>
    );
}

export default SchoolList;
