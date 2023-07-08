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
        navigate("/school-director/transportation-home");
    }


    return (
        <div className="SchoolDirectorDetails">
            {school == undefined && <Loading />}
            {school ?
                <div className="schoolCard">
                    <h1>פרטי בית הספר</h1>
                    <p> " שם בית הספר :"{school.schoolName} </p>
                    <p> כתובת : {school.address}  </p>
                    <p> {school.phone} :טלפון  </p>
                    <p>{school.password} :סיסמא</p>
                </div> : <Loading />}

            <div className="ButtonSchool">
                <button onClick={teacher}>מורים</button>
                <button onClick={student}>תלמידים</button>
                <button onClick={transportation}>הסעות</button>
            </div>
        </div>
    );
}

export default SchoolDirectorDetails;
