import { useNavigate } from "react-router-dom";
import SchoolUserModel from "../../../Models/SchoolUserModel";
import "./SchoolDirectorCard.css";

interface AllSchoolDirectorCardProps {
school: SchoolUserModel;
}

function SchoolDirectorCard(props: AllSchoolDirectorCardProps): JSX.Element {

    const navigate = useNavigate();


    function schoolDetail() {
        navigate("/school-details/" + props.school.id)
    }

    return (
        <div className="SchoolDirectorCard">
			
        </div>
    );
}

export default SchoolDirectorCard;
