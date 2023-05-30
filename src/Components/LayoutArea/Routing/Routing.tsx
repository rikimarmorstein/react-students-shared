import { Route, Routes } from "react-router-dom";
import AddTeacher from "../../SchoolDirectorArea/AddTeacher/AddTeacher";
import HomeArea from "../../HomeArea/HomeArea/HomeArea";
import Login from "../../AuthArea/Login/Login";
import AdminArea from "../../AdminArea/AdminArea/AdminArea";
import Layout from "../Layout/Layout";
import PageNotFound from "../PageNotFount/PageNotFound";
import SchoolDirector from "../../SchoolDirectorArea/SchoolDirectorDetails/SchoolDirectorDetails";
import TeacherDetails from "../../Teacher/TeacherDetails/TeacherDetails";

function Routing(): JSX.Element {


    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/home" element={<HomeArea />} />
                <Route index element={<HomeArea />} />

                <Route path="/login" element={<Login />} />
                <Route path="/school-director/add-teacher" element={<AddTeacher />} />
                <Route path="/school-director" element={<SchoolDirector />} />

                <Route path="/admin" element={<AdminArea />} />
                <Route path="/admin-login" element={<AdminArea />} />

                <Route path="/teacher" element={<TeacherDetails />} />
                {/* <Route path="/student" element={<StudentDetails />} />
                <Route path="/transportation" element={<TransportationDetails />} /> */}

                <Route path="*" element={<PageNotFound />} />
            </Routes>

        </div>
    );
}

export default Routing;
