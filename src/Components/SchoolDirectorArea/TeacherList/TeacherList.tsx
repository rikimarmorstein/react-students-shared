import { useNavigate } from "react-router-dom";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import "./TeacherList.css";
import { useEffect, useState } from "react";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import store from "../../../Redux/Store";
import { fetchTeacherAction } from "../../../Redux/SchoolDirectorState";
import notify from "../../../Services/NotificationService"


function TeacherList(): JSX.Element {

    const [teachers, setTeachers] = useState<TeacherUserModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        schoolDirectorService.getAllTeachers().then((res) => {
            setTeachers(res.data);
            store.dispatch(fetchTeacherAction(res.data));
        }).catch((error) => {
            notify.error(error);
        })
    }, []);

    function addTeacher() {
        navigate("/school-director/add-teacher");
    }


    function updateTeacher() {
        navigate("/school-director/update-teacher/");
    }

    function DeleteTeacher() {
        navigate("/school-director/delete-teacher/")
    }
    function Back() {
        navigate("/school-director/teachers")
    }

    return (
        <div>
            <div className="TeacherList">
                <h1>מורים</h1>
                <button onClick={addTeacher}>הוספת מורה</button>
                <button className="ToBack" onClick={Back}>🔙 הקודם</button>
                <table>

                    <tr>
                        <th> שם פרטי </th>
                        <th> שם משפחה </th>
                        <th> טלפון </th>
                        <th> משויך/כת לכיתה </th>
                    </tr>

                    {teachers.map((teacher) => (
                        <tr>
                            <th> {teacher.firstName} </th>
                            <th> {teacher.lastName} </th>
                            <th> {teacher.phone} </th>
                            <th> {teacher.numClass} </th>
                            <th> <button onClick={updateTeacher}>עדכון</button></th>
                            <th>  <button onClick={DeleteTeacher}>מחיקה</button> </th>
                        </tr>
                    ))}

                </table>


            </div>
        </div>
    );
}

export default TeacherList;
