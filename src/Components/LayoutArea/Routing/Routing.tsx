import { Route, Routes } from "react-router-dom";
import AddTeacher from "../../SchoolDirectorArea/AddTeacher/AddTeacher";
import HomeArea from "../../HomeArea/HomeArea/HomeArea";
import Login from "../../AuthArea/Login/Login";
import AdminArea from "../../AdminArea/AdminArea/AdminArea";
import Layout from "../Layout/Layout";
import PageNotFound from "../PageNotFount/PageNotFound";
import TeacherDetails from "../../Teacher/TeacherDetails/TeacherDetails";
import AddStudent from "../../SchoolDirectorArea/AddStudent/AddStudent";
import SchoolDirectorDetails from "../../SchoolDirectorArea/SchoolDirectorDetails/SchoolDirectorDetails";
import UpdateTeacher from "../../SchoolDirectorArea/UpdateTeacher/UpdateTeacher";
import DeleteTeacher from "../../SchoolDirectorArea/DeleteTeacher/DeleteTeacher";
import TeacherList from "../../SchoolDirectorArea/TeacherList/TeacherList";

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
                <Route path="/school-director" element={<SchoolDirectorDetails />} />

//teacher in SchoolDirector
                <Route path="/school-director/add-teacher" element={<AddTeacher />} />
                <Route path="/school-director/update-teacher" element={<UpdateTeacher />} />
                <Route path="/school-director/delete-teacher" element={<DeleteTeacher />} />
                <Route path="/school-director/list-teacher" element={<TeacherList />} />
                {/* <Route path="/school-director/card-teacher" element={<TeacherCard />} /> */}

//student in SchoolDirector
                <Route path="/add-student" element={<AddStudent />} />

//teacher
                <Route path="/teacher" element={<TeacherDetails />} />
//student                
                {/* <Route path="/student" element={<StudentDetails />} />
 //transportation              
                <Route path="/transportation" element={<TransportationDetails />} /> */}

                <Route path="*" element={<PageNotFound />} />
            </Routes>

        </div>
    );
}

export default Routing;
