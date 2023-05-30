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
        navigate("/teacher");
    }

    function student() {
        navigate("/student");
    }

    function transportation() {
        navigate("/transportation");
    }


    return (
        <div className="SchoolDirectorDetails">

            <h1>פרטי בית הספר</h1>
            <p>שם בית הספר: {schoolDirector?.name}</p>
            <p>כתובת: {schoolDirector?.address}</p>
            <p>טלפון/פלאפון: {schoolDirector?.phone}</p>
            <p>סיסמה: {schoolDirector?.password}</p>

            <div className="ButtonTeacher">
                <button onClick={teacher}>מורים</button>
                <button onClick={student}>תלמידים</button>
                <button onClick={student}>הסעות</button>
            </div>
        </div>
    );
}

export default SchoolDirectorDetails;
