import { useNavigate, useParams } from "react-router-dom";
import "./SchoolDirectorDetails.css";
import SchoolUserModel from "../../../Models/SchoolUserModel";
import store from "../../../Redux/Store";

function SchoolDirectorDetails(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const schoolDirectorId: number = Number(params.id);
    const schoolDirector: SchoolUserModel | undefined = store.getState().schoolState.schools.find((schoolDirector) => schoolDirector.id === schoolDirectorId);

    function teacher() {
        navigate("/school-director/teacher");
    }

    function student() {
        navigate("/school-director/students");
    }

    function transportation() {
        navigate("/school-director/transportation");
    }


    return (
        <div className="SchoolDirectorDetails">

            <h1>פרטי בית הספר</h1>
            <p>שם בית הספר: {schoolDirector?.name}</p>
            <p>כתובת: {schoolDirector?.address}</p>
            <p>טלפון: {schoolDirector?.phone}</p>
            <p>{schoolDirector?.password}סיסמה:</p>

            <div className="ButtonTeacher">
                <button onClick={teacher}>מורים</button>
                <button onClick={student}>תלמידים</button>
                <button onClick={student}>הסעות</button>
            </div>
        </div>
    );
}

export default SchoolDirectorDetails;
