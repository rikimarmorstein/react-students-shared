import { useEffect, useState } from "react";
import "./AllStudentsTeacher.css";
import StudentUserModel from "../../../Models/StudentUserModel";
import schoolDirectorService from "../../../Services/SchoolDirectorService";

import store from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
// import StudentCard from "../StudentCard/StudentCard";
import { format } from "path/win32";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsFillTrash3Fill, BsFillPencilFill, BsPersonFillAdd } from "react-icons/bs";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Button } from "@mui/material";

function AllStudentsTeacher(): JSX.Element {


  const [students, setStudents] = useState<StudentUserModel[]>(store.getState().schoolState.students);
  // const [selectedName, setSelectedName] = useState<string>("");


  const params = useParams();
  const studentId = +params.id;

  const navigate = useNavigate();

  // function AddStudent() {
  //   navigate("/add-student");
  // }

  function goBack() {
    navigate("/teacher-home")
  }

  useEffect(() => {
    (async () => {
      schoolDirectorService.getAllStudents().then((arr) => {
        setStudents(arr);
      }, (error) => {
        notificationService.error(error);
      });

    })();

  }, []);


  // async function deleteStudent(studentId: number) {

  //   if (window.confirm("Are you sure?")) {
  //     console.log(studentId);

  //     try {
  //       await schoolDirectorService.deleteStudent(studentId);
  //       notificationService.success(" deleted");

  //       navigate("/school-director/students");

  //     } catch (error: any) {
  //       notificationService.error(error);

  //     }
  //   }
  // }


  return (
    <div className="AllStudents">
      <h1>תלמידים</h1>
      {/* <button onClick={AddStudent}><BsPersonFillAdd/> </button> */}
      <button className="ToBack" onClick={goBack}><IoChevronBackCircleSharp/></button>

      <table>
        <tr>
          <th>  שם פרטי</th>
          <th> שם משפחה</th>
          <th>   מספר זהות</th>
          <th>  מספר כיתה</th>
          <th> מספר הסעה</th>
          <th>   האם נוסע</th>
          <th> סיבה</th>

          <th> שעת סיום</th>
          <th>   טלפון</th>
          <th> תחנת איסוף</th>
          <th>   הערות</th>
        </tr>
        {students.map((c) => (
          <tr>
            <td> {c.firstName}</td>
            <td> {c.lastName}</td>
            <td>  {c.studentId}</td>
            <td>  {c.numClass}</td>
            <td> {c.numBus}</td>
            <td>   {c.travel == true ? <>✔</> : <>✖</>} </td>
            <td>   {c.cause} </td>

            <td>   {c.hour}</td>
            <td> {c.phone}</td>
            <td> {c.pickupAddress}</td>
            <td> {c.remark}</td>
            {/* <td> <NavLink to={"/school-director/students/update/" + c.id}><BsFillPencilFill /></NavLink></td> */}
            {/* <td> <NavLink to={"/school-director/students/delete/" + c.id}><BsFillTrash3Fill /></NavLink></td> */}

            {/* <td>  <Button onClick={deleteStudent}><BsFillTrash3Fill /></Button></td> */}

          </tr>
          // <StudentCard key={c.id} student={c} />
        ))}</table>


    </div>
  );
}

export default AllStudentsTeacher;
