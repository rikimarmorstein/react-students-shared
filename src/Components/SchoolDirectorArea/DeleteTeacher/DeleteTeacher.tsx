import { useNavigate, useParams } from "react-router-dom";
import "./DeleteTeacher.css";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import store from "../../../Redux/Store";
import { deleteTeacherAction } from "../../../Redux/SchoolDirectorState";
import notify from "../../../Services/NotificationService";

function DeleteTeacher(): JSX.Element {

    const params = useParams();
    const teacherId = +(params.id || '');
    const navigate = useNavigate();

    const sendDeleteTeacher = () => {
        schoolDirectorService.deleteTeacher(teacherId).then((res) => {
            notify.success("המורה נמחק בהצלחה");
            store.dispatch(deleteTeacherAction(teacherId));
            navigate("/school-director");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div className="DeleteTeacher">
            <h2>?האם אתה בטוח שברצונך למחוק מורה זה</h2>
            <button onClick={sendDeleteTeacher}>כן</button>
            <button onClick={() => navigate("/school-director/teachers")}>לא</button>
        </div>
    );
}

export default DeleteTeacher;
