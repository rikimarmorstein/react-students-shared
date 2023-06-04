import { useNavigate, useParams } from "react-router-dom";
import "./TeacherDetails.css";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import store from "../../../Redux/Store";

function TeacherDetails(): JSX.Element {

    const params = useParams();
    const teacherId: number = Number(params.id);
    const teacher: TeacherUserModel | undefined = store.getState().schoolState.teachers.find((teacher) => teacher.id === teacherId);

    const navigate = useNavigate();

    function updateTeacher() {
        navigate("/school-director/update-teacher/" + teacherId);
    }

    function DeleteTeacher() {
        navigate("/admin/companies/delete/" + teacherId)
    }
    function Back() {
        navigate("/school-director/teachers")
    }

    return (
        <div className="TeacherDetails">
            <button className="ToBack" onClick={Back}>🔙הקודם</button>

            <div className="ButtonCompany">
                <button onClick={updateTeacher}>עדכון</button>
                <button onClick={DeleteTeacher}>מחיקה</button>
            </div>
            <p>{teacher.firstName +" "+teacher.lastName}שם המורה</p>
            <p>{teacher.phone}טלפון</p>
            <p>{teacher.numClass}המשויכת לכיתה</p>
        </div>
    );
}

export default TeacherDetails;
