import { Route, Routes } from "react-router-dom";
import AddTeacher from "../../SchoolDirectorArea/AddTeacher/AddTeacher";
import HomeArea from "../../HomeArea/HomeArea/HomeArea";
import Login from "../../AuthArea/Login/Login";
import AdminArea from "../../AdminArea/AdminArea/AdminArea";
import Layout from "../Layout/Layout";
import PageNotFound from "../PageNotFount/PageNotFound";
import AddStudent from "../../SchoolDirectorArea/AddStudent/AddStudent";
import SchoolDirectorDetails from "../../SchoolDirectorArea/SchoolDirectorDetails/SchoolDirectorDetails";
import UpdateTeacher from "../../SchoolDirectorArea/UpdateTeacher/UpdateTeacher";
import DeleteTeacher from "../../SchoolDirectorArea/DeleteTeacher/DeleteTeacher";
import TeacherList from "../../SchoolDirectorArea/TeacherList/TeacherList";
import AllStudents from "../../SchoolDirectorArea/AllStudents/AllStudents";
import TeacherDetails from "../../TeacherArea/TeacherDetails/TeacherDetails";
import TeacherCard from "../../SchoolDirectorArea/TeacherCard/TeacherCard";
import TeacherHome from "../../TeacherArea/TeacherHome/TeacherHome";
import UpdateStudent from "../../SchoolDirectorArea/UpdateStudent/UpdateStudent";
import UpdateTeacherMe from "../../TeacherArea/UpdateTeacherMe/UpdateTeacherMe";
import ParentHome from "../../ParentArea/ParentHome/ParentHome";
import DeleteStudent from "../../SchoolDirectorArea/DeleteStudent/DeleteStudent";
import TransportationDetails from "../../TransportationArea/TransportationDetails/TransportationDetails";
import AllStudentsTeacher from "../../TeacherArea/AllStudentsTeacher/AllStudentsTeacher";
import AddTransportation from "../../TransportationArea/AddTransportation/AddTransportation";
import TransportationList from "../../TransportationArea/TransportationList/TransportationList";
import AdminLogin from "../../AuthArea/AdminLogin/AdminLogin";
import SchoolList from "../../AdminArea/SchooList/SchoolList";


function Routing(): JSX.Element {


    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/home" element={<HomeArea />} />
                <Route index element={<HomeArea />} />
//admin
                <Route path="/admin" element={<AdminArea />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-home" element={<AdminArea />} />
                <Route path="/admin-home/all-schools" element={<SchoolList />} />

//school
                <Route path="/login" element={<Login />} />
                <Route path="/school-director" element={<SchoolDirectorDetails />} />

//teacher in SchoolDirector
                <Route path="/school-director/teachers" element={<TeacherList />} />
                <Route path="/school-director/add-teacher" element={<AddTeacher />} />
                <Route path="/school-director/update-teacher/:id" element={<UpdateTeacher />} />
                <Route path="/school-director/delete-teacher/:id" element={<DeleteTeacher />} />

//student in SchoolDirector
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/school-director/students" element={<AllStudents />} />
                <Route path="/school-director/students/update/:studentId" element={<UpdateStudent />} />
                <Route path="/school-director/students/delete/:studentId" element={<DeleteStudent />} />

//teacher
                <Route path="/teacher/:id" element={<TeacherDetails />} />
                <Route path="/teacher-home" element={<TeacherHome />} />
                <Route path="/update-teacher/:id" element={<UpdateTeacherMe />} />
//student in teacher
                <Route path="/teacher/students" element={<AllStudentsTeacher />} />

                {/* <Route path="/student-home" element={< />} /> */}
//transportation
                <Route path="/school-director/transportation-home" element={<TransportationDetails />} />
                <Route path="/school-director/transportation-home/add" element={<AddTransportation />} />
                <Route path="/school-director/transportation-home/all" element={<TransportationList />} />


// parent
                <Route path="/parent-home" element={<ParentHome />} />


                <Route path="*" element={<PageNotFound />} />
            </Routes>

        </div>
    );
}

export default Routing;
