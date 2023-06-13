import { NavLink, useNavigate } from "react-router-dom";
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

    function goBack() {
        navigate("/school-director")
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
                                <td> {teacher.firstName} </td>
                                <td> {teacher.lastName} </td>
                                <td> {teacher.phone} </td>
                                <td> {teacher.numClass} </td>
                                <td> <NavLink to={"/school-director/update-teacher/"+ teacher.id}>עדכון</NavLink></td>
                                <td> <NavLink to={"/school-director/delete-teacher/"+ teacher.id}>מחיקה</NavLink></td>
                            </tr>
                        ))}
                    {/* </tbody> */}
                </table>


            </div>
        </div>
    );
}

export default TeacherList;
