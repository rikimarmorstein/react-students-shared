import { Route, Routes } from "react-router-dom";
import AddTeacher from "../../SchoolDirectorArea/AddTeacher/AddTeacher";
import HomeArea from "../../HomeArea/HomeArea/HomeArea";
import Login from "../../AuthArea/Login/Login";
import AdminArea from "../../AdminArea/AdminArea/AdminArea";
import Layout from "../Layout/Layout";
import PageNotFound from "../PageNotFount/PageNotFound";

function Routing(): JSX.Element {



    return (
        <div className="Routing">
			<Routes>
            <Route path="/" element={<Layout />} />
                <Route path="/home" element={<HomeArea />} />
                <Route index element={<HomeArea />} />

                <Route path="/login" element={<Login/>} />

                <Route path="/school-director" element={<AddTeacher />} />
                <Route path="/admin" element={<AdminArea />} />

                <Route path="*" element={<PageNotFound />} />
                </Routes>

        </div>
    );
}

export default Routing;
