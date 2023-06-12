import { useEffect, useState } from "react";
import "./TeacherHome.css";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import teacherService from "../../../Services/TeacherService";
import notificationService from "../../../Services/NotificationService";


function TeacherHome(): JSX.Element {

    const [teacher, setTeacher] = useState<TeacherUserModel>();

    useEffect(() => {
        teacherService.getTeacherDetails().then((teacher) => {
            setTeacher(teacher.data);
            // store.dispatch(fetchTeacherAction(res.data));
        }).catch((error) => {
            notificationService.error(error);
        })
    }, []);

    return (
        <div className="TeacherHome">
			
        </div>
    );
}

export default TeacherHome;
