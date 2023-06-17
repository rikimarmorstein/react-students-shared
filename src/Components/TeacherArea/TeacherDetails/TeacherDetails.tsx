import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./TeacherDetails.css";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";
import teacherService from "../../../Services/TeacherService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../SharedArea/Loading/Loading";

function TeacherDetails(): JSX.Element {

    // const params = useParams();
    // const teacherId: number = Number(params.id);
    // const teacher: TeacherUserModel | undefined = store.getState().schoolState.teachers.find((teacher) => teacher.id === teacherId);

    const navigate = useNavigate();

    const [teacher, setTeacher] = useState<TeacherUserModel>();

    useEffect(() => {
        teacherService.getTeacherDetails().then((teacher) => {
            setTeacher(teacher.data);
            console.log(teacher);
            
            // store.dispatch(fetchTeacherAction(teacher.data));
        }).catch((error) => {
            notificationService.error(error);
        })
    }, []);


    // function updateTeacher() {
    //     navigate("/update-teacher/" + teacher.id);
    // }

    // function DeleteTeacher() {
    //     navigate("/school-director/delete-teacher/" + teacher.id)
    // }
    function Back() {
        navigate("/teacher-home")
    }

    return (
        <div className="TeacherDetails">
            {teacher == undefined && <Loading />}
            {teacher ?
                <div className="teacherCard">
                    <h1>פרטי מורה</h1>
                    <p>{teacher.firstName + " " + teacher.lastName}  -שם המורה</p>
                    <p>{teacher.phone}  -טלפון</p>
                    <p> {teacher.password} -סיסמא</p>
                    <p>{teacher.numClass}  -המשויכ/ת לכיתה</p>
            <NavLink to={"/update-teacher/" + teacher.id}>עדכון</NavLink>
                </div> : <Loading />}
            <button className="ToBack" onClick={Back}>🔙 הקודם</button>

            {/* <button onClick={updateTeacher}>עדכון</button> */}
            {/* <button onClick={DeleteTeacher}>מחיקה</button> */}
        </div>
    );
}

export default TeacherDetails;
