import { useNavigate, useParams } from "react-router-dom";
import "./DeleteStudent.css";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import notificationService from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { deleteStudentsAction } from "../../../Redux/SchoolDirectorState";

function DeleteStudent(): JSX.Element {


    const params = useParams();
    const studentId = +(params.studentId || '');
    const navigate = useNavigate();


    async function deleteStudent() {

        try {
            await schoolDirectorService.deleteStudent(studentId);

            notificationService.success("נמחק");
            store.dispatch(deleteStudentsAction(studentId));

            navigate("/school-director/students");

        } catch (error: any) {
            notificationService.error(error);

        }
    }

    return (

        <div className="DeleteStudent">
            <h2>?האם אתה בטוח שברצונך למחוק תלמיד זה   </h2>
            <button onClick={deleteStudent}>כן</button>
            <button onClick={() => navigate("/school-director/students")}>לא</button>
        </div>
    );
}

export default DeleteStudent;
