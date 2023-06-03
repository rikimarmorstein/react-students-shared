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

    function addTeacher(){
        navigate("")
    }

    return (
        <div className="TeacherList">

        </div>
    );
}

export default TeacherList;
