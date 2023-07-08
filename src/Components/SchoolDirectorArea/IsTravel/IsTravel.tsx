import { useNavigate, useParams } from "react-router-dom";
import "./IsTravel.css";
import { useEffect, useState } from "react";
import notificationService from "../../../Services/NotificationService";
import schoolDirectorService from "../../../Services/SchoolDirectorService";

function IsTravel(): JSX.Element {
    const params = useParams();
    const id = +params.studentId;
    //const { register, handleSubmit, formState, setValue } = useForm<StudentUserModel>();
    const [travel, setTravel] = useState<boolean>();

    const navigate = useNavigate();

    useEffect(() => {
        schoolDirectorService.getOneStudent(id)
            .then((s) => {
                schoolDirectorService.setStudentToTravel(id);
            })
            .catch((err) =>
                notificationService.error(err)
            );
    }, []);
    return (
        <div className="IsTravel">

        </div>
    );
}

export default IsTravel;
