import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import AddTeacher from "../../SchoolDirectorArea/AddTeacher/AddTeacher";
import HomeArea from "../../HomeArea/HomeArea/HomeArea";
import Login from "../../AuthArea/Login/Login";
import AdminArea from "../../AdminArea/AdminArea/AdminArea";

function Routing(): JSX.Element {



    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<HomeArea />} />
                <Route index element={<HomeArea />} />

                <Route path="/login" element={<Login/>} />

                <Route path="/school-director" element={<AddTeacher />} />
                <Route path="/admin" element={<AdminArea />} />

                </Routes>

        </div>
    );
}

export default Routing;
