import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import AddTeacher from "../../SchoolDirectorArea/AddTeacher/AddTeacher";
import { Login } from "@mui/icons-material";
import HomeArea from "../../HomeArea/HomeArea/HomeArea";

function Routing(): JSX.Element {



    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<HomeArea />} />
                <Route index element={<HomeArea />} />

                <Route path="/login" element={<Login/>} />

                <Route path="/school-director" element={<AddTeacher />} />
                {/* <Route path="/school-director" element={<AddTeacher />} /> */}

                </Routes>

        </div>
    );
}

export default Routing;
