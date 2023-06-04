import { useEffect, useState } from "react";
import SchoolUserModel from "../../../Models/SchoolUserModel";
import store from "../../../Redux/Store";
import "./SchooList.css";
import notify from "../../../Services/NotificationService"

import SchoolDirectorDetails from "../../SchoolDirectorArea/SchoolDirectorDetails/SchoolDirectorDetails";
import { useNavigate } from "react-router-dom";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import { fetchSchoolAction } from "../../../Redux/SchoolDirectorState";
import adminService from "../../../Services/AdminService";
import SchoolDirectorCard from "../../SchoolDirectorArea/SchoolDirectorCard/SchoolDirectorCard";

function SchooList(): JSX.Element {

    const [schools, setSchools] = useState<SchoolUserModel[]>(store.getState().schoolState.schools);

    const navigate = useNavigate();

    useEffect(() => {
        adminService.getAllSchools().then((res) => {
            setSchools(res.data);
            store.dispatch(fetchSchoolAction(res.data));
        }).catch((error) => {
            notify.error(error);
        })
    }, []);

    // function addCustomer() {
    //     navigate("/admin/customers/add");
    // }

    return (
        <div className="SchooList">
            {schools.length > 0 ? schools.map((school) => (
                <SchoolDirectorCard key={school.id} school={school} />
            )) : <span>no coupons yet 😒</span>}
        </div>
    );
}

export default SchooList;
