import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import AddTeacher from "../../SchoolDirectorArea/AddTeacher/AddTeacher";
import { Login } from "@mui/icons-material";

function Routing(): JSX.Element {



    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />

                <Route path="/login" element={<Login/>} />

                <Route path="/school-director" element={<AddTeacher />} />
                {/* <Route path="/school-director" element={<AddTeacher />} /> */}

                </Routes>

        </div>
    );
}

export default Routing;
