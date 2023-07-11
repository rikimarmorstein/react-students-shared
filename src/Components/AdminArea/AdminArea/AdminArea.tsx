import { useNavigate } from "react-router-dom";
import "./AdminArea.css";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField } from "@mui/material";


function AdminArea(): JSX.Element {
    const navigate = useNavigate();

    function allSchool(){
        navigate("/admin-home/all-schools");
    }
    return (
        <div className="AdminArea">
           
           <Button onClick={allSchool}>רשימת בתי הספר</Button>
        </div>

    );
}

export default AdminArea;
