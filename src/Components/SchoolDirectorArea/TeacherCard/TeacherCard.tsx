import { useNavigate } from "react-router-dom";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import "./TeacherCard.css";

interface TeacherCardProps{
    teacher: TeacherUserModel;
}

function TeacherCard(props: TeacherCardProps): JSX.Element {
    
    const navigate = useNavigate();

    function MoreDetails(){
        navigate("/teacher/"+props.teacher.id);
    }

    return (
        <div className="TeacherCard">
			<p>{props.teacher.firstName}</p> <p>{props.teacher.lastName}</p>
			<p>{props.teacher.phone}</p>
			<p>{props.teacher.numClass}</p>
            <button onClick={MoreDetails}> לפרטים נוספים לחץ כאן</button>
        </div>
    );
}

export default TeacherCard;
