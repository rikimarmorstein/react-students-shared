import { Route, Routes } from "react-router-dom";
import AddTeacher from "../../SchoolDirectorArea/AddTeacher/AddTeacher";
import HomeArea from "../../HomeArea/HomeArea/HomeArea";
import Login from "../../AuthArea/Login/Login";
import AdminArea from "../../AdminArea/AdminArea/AdminArea";
import Layout from "../Layout/Layout";
import PageNotFound from "../PageNotFount/PageNotFound";
import SchoolDirector from "../../SchoolDirectorArea/SchoolDirector/SchoolDirector";
import AddStudent from "../../SchoolDirectorArea/AddStudent/AddStudent";

function Routing(): JSX.Element {


    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/home" element={<HomeArea />} />
                <Route index element={<HomeArea />} />
//admin
                <Route path="/admin" element={<AdminArea />} />
                <Route path="/admin-login" element={<AdminArea />} />
//school
                <Route path="/login" element={<Login />} />
                <Route path="/school-director/add-teacher" element={<AddTeacher />} />
                <Route path="/school-director" element={<SchoolDirector />} />
                <Route path="/add-student" element={<AddStudent />} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>

        </div>
    );
}

export default Routing;
