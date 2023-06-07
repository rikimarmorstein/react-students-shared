import { useNavigate, useParams } from "react-router-dom";
import "./SchoolDirectorDetails.css";
import SchoolUserModel from "../../../Models/SchoolUserModel";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../SharedArea/Loading/Loading";

function SchoolDirectorDetails(): JSX.Element {

    const [school, setSchool] = useState<SchoolUserModel>();
    useEffect(() => {
        (async () => {

            schoolDirectorService.getSchoolDetails().then((school) => {
                setSchool(school.data);
               
            }, (error) => {
                notificationService.error(error);
            });

        })();

    }, []);


    const navigate = useNavigate();
    // const params = useParams();
    // const schoolDirectorId: number = Number(params.id);
    // const schoolDirector: SchoolUserModel | undefined = store.getState().schoolState.schools.find((schoolDirector) => schoolDirector.id === schoolDirectorId);

    function teacher() {
        navigate("/school-director/teachers");
    }

    function student() {
        navigate("/school-director/students");
    }

    function transportation() {
        navigate("/transportation-home");
    }


    return (
        <div className="SchoolDirectorDetails">
 {school== undefined && <Loading/>}  
            { school ?
                <div>
                    <h1>פרטי בית הספר</h1>
            <h3>שם בית הספר: {school.schoolName}</h3>
            <h4>כתובת: {school.address}</h4>
            <h4>טלפון: {school.phone}</h4>
            <h4>{school.password}סיסמה:</h4>
                </div> : <Loading/>}
                
            <div className="ButtonTeacher">
                <button onClick={teacher}>מורים</button>
                <button onClick={student}>תלמידים</button>
                <button onClick={student}>הסעות</button>
            </div>
        </div>
    );
}

export default SchoolDirectorDetails;
