import { useNavigate, useParams } from "react-router-dom";
import "./DeleteSchool.css";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { deleteSchoolAction } from "../../../Redux/SchoolDirectorState";

function DeleteSchool(): JSX.Element {


    const params = useParams();
    const schoolId = +(params.id || '');
    const navigate = useNavigate();
    async function deleteSchool() {

        try {
            await adminService.deleteSchool(schoolId);
            notificationService.success("נמחק");
            store.dispatch(deleteSchoolAction(schoolId));
            navigate("/admin-home/all-schools");
        } catch (error: any) {
            notificationService.error(error);
        }
    }
    return (
        <div className="DeleteSchool">
            <h2>?האם אתה בטוח שברצונך למחוק בית ספר זה   </h2>
            <button onClick={deleteSchool}>כן</button>
            <button onClick={() => navigate("/admin-home/all-schools")}>לא</button>
        </div>
    );
}

export default DeleteSchool;
