import { useNavigate } from "react-router-dom";
import "./AdminArea.css";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField } from "@mui/material";
import AddSchool from "../AddSchool/AddSchool";


function AdminArea(): JSX.Element {
    const navigate = useNavigate();
    function addSchool() {
        navigate("/admin-home/add-school");
    }
    function allSchool() {
        navigate("/admin-home/all-schools");
    }
    return (
        <div className="AdminArea">
            <Button onClick={addSchool}>הוספת בית ספר</Button>

            <Button onClick={allSchool}>רשימת בתי הספר</Button>
        </div>

    );
}

export default AdminArea;
