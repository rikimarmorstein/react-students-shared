import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./ParentDetails.css";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";
import teacherService from "../../../Services/TeacherService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../SharedArea/Loading/Loading";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { BsFillTrash3Fill, BsFillPencilFill, BsPersonFillAdd } from "react-icons/bs";
import StudentUserModel from "../../../Models/StudentUserModel";
import parentService from "../../../Services/ParentService";
import { string } from "yup";



function ParentDetails(): JSX.Element {

    const navigate = useNavigate();

    const [students, setStudents] = useState<StudentUserModel[]>([]);

    useEffect(() => {
        parentService.getAllStudentsByPhone('phone_number_here').then((res)=>{
            setStudents(res.data);
            // store.dispatch(fetchTeacherAction(teacher.data));
        }).catch((error) => {
            notificationService.error(error);
        })
    }, []);

    // function Back() {
    //     navigate("/teacher-home")
    // }

    return (
        <div className="TeacherDetails">
            {/* <button className="ToBack" onClick={Back}><IoChevronBackCircleSharp /></button>
            {teacher == undefined && <Loading />}
            {teacher ?
                <div className="teacherCard">
                    <h1>פרטי מורה</h1>
                    <p>{teacher.firstName + " " + teacher.lastName}  -שם המורה</p>
                    <p>{teacher.phone}  -טלפון</p>
                    <p> {teacher.password} -סיסמא</p>
                    <p>{teacher.numClass}  -המשויכ/ת לכיתה</p>
                    <NavLink to={"/update-teacher/" + teacher.id}><BsFillPencilFill /></NavLink> */}
                {/* </div> : <Loading />} */}

            {/* <button onClick={updateTeacher}>עדכון</button> */}
            {/* <button onClick={DeleteTeacher}>מחיקה</button> */}
        </div>
    );
}

export default ParentDetails;
