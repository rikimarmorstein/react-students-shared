import { ChangeEvent, useEffect, useState } from "react";
import "./AllStudents.css";
import StudentUserModel from "../../../Models/StudentUserModel";
import schoolDirectorService from "../../../Services/SchoolDirectorService";

import store from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import StudentCard from "../StudentCard/StudentCard";
import { format } from "path/win32";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsFillTrash3Fill, BsFillPencilFill, BsPersonFillAdd } from "react-icons/bs";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Button } from "@mui/material";


function AllStudents(): JSX.Element {
  const params = useParams();
  const studentId = +params.id;
  const navigate = useNavigate();

  const [students, setStudents] = useState<StudentUserModel[]>(store.getState().schoolState.students);
  const [classFilter, setClassFilter] = useState<string>("");
  const [busFilter, setBusFilter] = useState<number | null>(null);
  const [letterOrderFilter, setLetterOrderFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"bus" | "class">("bus");

  function handleSortByChange(e: ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value as "bus" | "class");
  }

  function handleClassFilterChange(e: ChangeEvent<HTMLInputElement>) {
    setClassFilter(e.target.value.toUpperCase());
  }

  function handleBusFilterChange(e: ChangeEvent<HTMLInputElement>) {
    const busNumber = parseInt(e.target.value);
    setBusFilter(isNaN(busNumber) ? null : busNumber);
  }

  function handleLetterOrderFilterChange(e: ChangeEvent<HTMLInputElement>) {
    setLetterOrderFilter(e.target.value);
  }

  function AddStudent() {
    navigate("/add-student");
  }

  function goBack() {
    navigate("/school-director")
  }

  useEffect(() => {
    let sortedStudents = [...store.getState().schoolState.students];
  
    if (sortBy === "bus") {
      sortedStudents.sort((a, b) => a.numBus - b.numBus);
    } else if (sortBy === "class") {
      sortedStudents.sort((a, b) => {
        if (a.numClass === b.numClass) {
          return a.lastName.localeCompare(b.lastName);
        } else {
          return a.numClass.localeCompare(b.numClass);
        }
      });
    }
  
    setStudents(sortedStudents);
  }, [sortBy]);
  
  useEffect(() => {
    let filteredStudents = store.getState().schoolState.students;


    if (classFilter !== "") {
      filteredStudents = filteredStudents.filter((student) => student.numClass === classFilter);
    }

    if (busFilter !== null) {
      filteredStudents = filteredStudents.filter((student) => student.numBus === busFilter);
    }

    if (letterOrderFilter !== "") {
      filteredStudents = filteredStudents.filter((student) => student.lastName.startsWith(letterOrderFilter));
    }

    filteredStudents.sort((a, b) => a.lastName.localeCompare(b.lastName));


    setStudents(filteredStudents);
  }, [classFilter, busFilter, letterOrderFilter]);


  useEffect(() => {
    (async () => {
      schoolDirectorService.getAllStudents().then((arr) => {
        setStudents(arr);
      }, (error) => {
        notificationService.error(error);
      });

    })();

  }, []);



  async function deleteStudent(studentId: number) {

    if (window.confirm("Are you sure?")) {
      console.log(studentId);

      try {
        await schoolDirectorService.deleteStudent(studentId);
        notificationService.success(" deleted");

        navigate("/school-director/students");

      } catch (error: any) {
        notificationService.error(error);

      }
    }
  }


  return (
    <div className="AllStudents">
      <h1>תלמידים</h1>
      <button onClick={AddStudent}><BsPersonFillAdd /> </button>
      <button className="ToBack" onClick={goBack}><IoChevronBackCircleSharp /></button>

      <div className="סנן לפי">
        <label>סדר הצגה:</label>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="bus">מספר הסעה</option>
          <option value="class">מספר כיתה</option>
        </select>
      </div>

      <div className="סנן לפי">
        <label>כיתה</label>
        <input type="text" name="classFilter" id="classFilter" onChange={handleClassFilterChange} value={classFilter} />

        <label>מספר הסעה:</label>
        <input type="number" name="busFilter" id="busFilter" min={0} onChange={handleBusFilterChange} value={busFilter ?? ""} />

        <label>חיפוש לפי שם משפחה</label>
        <input type="text" name="letterOrderFilter" id="letterOrderFilter" onChange={handleLetterOrderFilterChange} value={letterOrderFilter} />
      </div>
      {/* Student list */}
      <table>
        <thead>
          <tr>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>מספר זהות</th>
            <th>מספר כיתה</th>
            <th>מספר הסעה</th>
            <th>האם נוסע</th>
            <th>סיבה</th>
            <th>שעת סיום</th>
            <th>טלפון</th>
            <th>תחנת איסוף</th>
            <th>הערות</th>
          </tr>
        </thead>
        <tbody>

          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.studentId}</td>
              <td>{student.numClass}</td>
              <td>{student.numBus}</td>
              <td>{student.travel ? "✔" : "✖"}</td>
              <td>{student.cause}</td>
              <td>{student.hour}</td>
              <td>{student.phone}</td>
              <td>{student.pickupAddress}</td>
              <td>{student.remark}</td>
              <td>
                <NavLink to={"/school-director/students/update/" + student.id}>
                  <BsFillPencilFill />
                </NavLink>
              </td>
              <td>
                <NavLink to={"/school-director/students/delete/" + student.id}>
                  <BsFillTrash3Fill />
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllStudents;
