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
  // const [students, setStudents] = useState<StudentUserModel[]>(store.getState().schoolState.students);
  // const [classLayer, setClassLayer] = useState<string>("");
  // // const [selectedName, setSelectedName] = useState<string>("");

  // function changeSelectClass(e: ChangeEvent<HTMLSelectElement>) {
  //   const selectedClassLayer = e.currentTarget.value;
  //   setClassLayer(selectedClassLayer);
    
  const [students, setStudents] = useState<StudentUserModel[]>(store.getState().schoolState.students);
  const [classFilter, setClassFilter] = useState<string>("");
  const [busFilter, setBusFilter] = useState<number | null>(null);
  const [letterOrderFilter, setLetterOrderFilter] = useState<string>("");

  function handleClassFilterChange(e: ChangeEvent<HTMLSelectElement>) {
    setClassFilter(e.target.value);
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
  
      setStudents(filteredStudents);
    }, [classFilter, busFilter, letterOrderFilter]);
  //   let filterStudents = store.getState().schoolState.students;
  //   if (selectedClassLayer !== "") {
  //     filterStudents = filterStudents.filter((student) => {
  //       return student.numClass === selectedClassLayer;
  //     })
  //   }
  //   setStudents(filterStudents);
  // }
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
        <label>כיתות:</label>
        <select name="classFilter" id="classFilter" onChange={handleClassFilterChange} value={classFilter}>
          <option value="">הכל</option>
          <option value="א">כיתות א</option>
          <option value="ב">כיתות ב</option>
          <option value="ג">כיתות ג</option>
          <option value="ד">כיתות ד</option>
          <option value="ה">כיתות ה</option>
          <option value="ו">כיתות ו</option>
        </select>

        <label>מספר הסעה:</label>
        <input type="number" name="busFilter" id="busFilter" min={0} onChange={handleBusFilterChange} value={busFilter ?? ""} />

        <label>סדר אותיות:</label>
        <input type="text" name="letterOrderFilter" id="letterOrderFilter" onChange={handleLetterOrderFilterChange} value={letterOrderFilter} />
      </div>

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
            <td> <NavLink to={"/school-director/students/update/" + c.id}><BsFillPencilFill /></NavLink></td>
            <td> <NavLink to={"/school-director/students/delete/" + c.id}><BsFillTrash3Fill /></NavLink></td>

            {/* <td>  <Button onClick={deleteStudent}><BsFillTrash3Fill /></Button></td> */}

          </tr>
          // <StudentCard key={c.id} student={c} />
        ))}</table>


    </div>
  );
}

export default AllStudents;
