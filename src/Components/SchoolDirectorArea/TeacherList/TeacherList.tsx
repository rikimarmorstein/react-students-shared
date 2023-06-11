import { useNavigate } from "react-router-dom";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import "./TeacherList.css";
import { useEffect, useState } from "react";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import store from "../../../Redux/Store";
import { fetchTeacherAction } from "../../../Redux/SchoolDirectorState";
import notify from "../../../Services/NotificationService"
// import XLSX from 'xlsx';

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

    function deleteTeacher() {
        navigate("/school-director/delete-teacher/")
    }
    function goBack() {
        navigate("/school-director/teachers")
    }

    // function exportToExcel() {
    //     const worksheet = XLSX.utils.json_to_sheet(teachers);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Teachers");
    //     const excelBuffer = XLSX.write(workbook, {
    //         bookType: "xlsx",
    //         type: "array",
    //     });

    //     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "teachers.xlsx");
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     URL.revokeObjectURL(url);
    // }


    return (
        <div>
            <div className="TeacherList">
                <h1>מורים</h1>
                <button onClick={addTeacher}>הוספת מורה</button>
                <button className="ToBack" onClick={goBack}>🔙 הקודם</button>
                <table>
                    {/* <thead> */}
                        <tr>
                            <th> שם פרטי </th>
                            <th> שם משפחה </th>
                            <th> טלפון </th>
                            <th> משויך/כת לכיתה </th>
                        </tr>
                    {/* </thead>
                    <tbody> */}
                        {teachers.map((teacher) => (
                            <tr>
                                <th> {teacher.firstName} </th>
                                <th> {teacher.lastName} </th>
                                <th> {teacher.phone} </th>
                                <th> {teacher.numClass} </th>
                                <th> <button onClick={updateTeacher}>עדכון</button></th>
                                <th>  <button onClick={deleteTeacher}>מחיקה</button> </th>
                            </tr>
                        ))}
                    {/* </tbody> */}
                </table>


            </div>
        </div>
    );
}

export default TeacherList;
