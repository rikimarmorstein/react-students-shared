import { useNavigate } from "react-router-dom";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import "./TeacherList.css";
import { useEffect, useState } from "react";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import store from "../../../Redux/Store";
import { fetchTeacherAction } from "../../../Redux/SchoolDirectorState";
import notify from "../../../Services/NotificationService"
import TeacherCard from "../TeacherCard/TeacherCard";

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

    function addTeacher(){
        navigate("/school-director/add-teacher");
    }

    return (
        <div>
            <h2>מורים</h2>
        <div className="TeacherList" id="teacher-list-top">
            <button onClick={addTeacher}>הוספת מורה</button>
            {teachers.length > 0 ? teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher}/>
            )): <span>אין מורים כרגע😒</span>}
            <a href="#teacher-list-top">👆</a>

        </div>
        </div>
    );
}

export default TeacherList;
