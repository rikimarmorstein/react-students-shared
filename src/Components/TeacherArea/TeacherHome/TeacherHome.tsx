import { useEffect, useState } from "react";
import "./TeacherHome.css";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import teacherService from "../../../Services/TeacherService";
import notificationService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import Loading from "../../SharedArea/Loading/Loading";


function TeacherHome(): JSX.Element {

    const navigate = useNavigate();

    const [teacher, setTeacher] = useState<TeacherUserModel>();

    useEffect(() => {
        teacherService.getTeacherDetails().then((teacher) => {
            setTeacher(teacher.data);
            // store.dispatch(fetchTeacherAction(teacher.data));
        }).catch((error) => {
            notificationService.error(error);
        })
    }, []);


    function teacherDetails() {
        navigate("/teacher/" + teacher.id);
    }
    function student() {
        navigate("/teacher/students");
    }

    return (
        <div className="TeacherHome">
            {teacher == undefined && <Loading />}
            {teacher ?
                <div className="teacherCard">
                    <h1> {teacher.firstName + " " + teacher.lastName}</h1>
                    {/* <p> {teacher.firstName +" "+ teacher.lastName} :שם המורה  </p> */}
                    {/* <p> {teacher.phone} :טלפון  </p>
                    <p> {teacher.password} :סיסמא</p> */}
                </div> : <Loading />}

            <div className="ButtonTeacher">
                <button onClick={teacherDetails}>פרטים אישיים</button>
                <button onClick={student}>תלמידים</button>
                {/* <button onClick={student}>הסעות</button> */}
            </div>
        </div>
    );
}

export default TeacherHome;
