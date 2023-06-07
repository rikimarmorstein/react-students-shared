import { useEffect, useState } from "react";
import "./AllStudents.css";
import StudentUserModel from "../../../Models/StudentUserModel";
import schoolDirectorService from "../../../Services/SchoolDirectorService";

import store from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import StudentCard from "../StudentCard/StudentCard";
import { format } from "path/win32";
import { NavLink } from "react-router-dom";

function AllStudents(): JSX.Element {


  const [students, setStudents] = useState<StudentUserModel[]>(store.getState().schoolState.students);
  // const [selectedName, setSelectedName] = useState<string>("");



  useEffect(() => {
    (async () => {
      schoolDirectorService.getAllStudents().then((arr) => {
        setStudents(arr);
      }, (error) => {
        notificationService.error(error);
      });

    })();

  }, []);


  return (
    <div className="AllStudents">


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
            <td> <NavLink to={"/school-director/students/update/"+ c.id}>update</NavLink></td>

          </tr>
          // <StudentCard key={c.id} student={c} />
        ))}</table>


    </div>
  );
}

export default AllStudents;
