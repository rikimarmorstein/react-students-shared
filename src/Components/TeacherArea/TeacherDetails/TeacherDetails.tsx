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
        navigate("/school-director/delete-teacher/" + teacherId)
    }
    function Back() {
        navigate("/school-director/teachers")
    }

    return (
        <div className="TeacherDetails">
            <h1>פרטי מורה</h1>
            <button className="ToBack" onClick={Back}>🔙 הקודם</button>
            <button onClick={updateTeacher}>עדכון</button>
            <button onClick={DeleteTeacher}>מחיקה</button>
            <p>{teacher.firstName + " " + teacher.lastName}  -שם המורה</p>
            <p>{teacher.phone}  -טלפון</p>
            <p>{teacher.numClass}  -המשויכת לכיתה</p>
        </div>
    );
}

export default TeacherDetails;
