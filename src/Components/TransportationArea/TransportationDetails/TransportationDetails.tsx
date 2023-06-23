import { useNavigate } from "react-router-dom";
import AddTransportation from "../AddTransportation/AddTransportation";
import "./TransportationDetails.css";
import { Button } from "@mui/material";

function TransportationDetails(): JSX.Element {
    const navigate = useNavigate();

    function add(){
        navigate("/school-director/transportation-home/add");
    }
    function all(){
        navigate("/school-director/transportation-home/all");
    }
    return (
        <div className="TransportationDetails">
		
        <Button onClick={add}>הוספת הסעה</Button>
        <Button onClick={all}>כל ההסעות</Button>

        </div>
    );
}

export default TransportationDetails;
