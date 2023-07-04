import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./AllStudents.css";
import StudentUserModel from "../../../Models/StudentUserModel";
import schoolDirectorService from "../../../Services/SchoolDirectorService";

import store from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsFillTrash3Fill, BsFillPencilFill, BsPersonFillAdd } from "react-icons/bs";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


function AllStudents(): JSX.Element {
  const { id } = useParams();
  const studentId = +id;
  const navigate = useNavigate();

  const [students, setStudents] = useState<StudentUserModel[]>([]); // Initialize with an empty array

  // const [students, setStudents] = useState<StudentUserModel[]>(store.getState().schoolState.students);
  const [classFilter, setClassFilter] = useState<string>("");
  const [busFilter, setBusFilter] = useState<number | null>(null);
  const [letterOrderFilter, setLetterOrderFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"bus" | "class">("bus");
  const [boardingFilter, setBoardingFilter] = useState<string>("everyone");
  const pdfRef = useRef(null);


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

  function handleBoardingFilterChange(e: ChangeEvent<HTMLSelectElement>) {
    setBoardingFilter(e.target.value);
  }

  function AddStudent() {
    navigate("/add-student");
  }

  function goBack() {
    navigate("/school-director")
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
    let filteredStudents = [...store.getState().schoolState.students];

    // let filteredStudents = store.getState().schoolState.students;


    if (classFilter !== "") {
      filteredStudents = filteredStudents.filter((student) => student.numClass === classFilter);
    }

    if (busFilter !== null) {
      filteredStudents = filteredStudents.filter((student) => student.numBus === busFilter);
    }

    if (letterOrderFilter !== "") {
      filteredStudents = filteredStudents.filter((student) => student.lastName.startsWith(letterOrderFilter));
    }

    if (boardingFilter === "boarding") {
      filteredStudents = filteredStudents.filter((student) => student.travel);
    } else if (boardingFilter === "not-boarding") {
      filteredStudents = filteredStudents.filter((student) => !student.travel);
    }

    setStudents(filteredStudents);
  }, [classFilter, busFilter, letterOrderFilter, boardingFilter]);

  // }, [classFilter, busFilter, letterOrderFilter]);


  async function deleteStudent(studentId: number) {

    if (window.confirm("? האם אתה בטוח ")) {
      console.log(studentId);

      try {
        await schoolDirectorService.deleteStudent(studentId);
        notificationService.success("נמחק");

        navigate("/school-director/students");

      } catch (error: any) {
        notificationService.error(error);

      }
    }
  }

  function handleExportToPdf() {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("students.pdf");
    });
  }

  // function handleExportToExcel() {
  //   const worksheet = XLSX.utils.json_to_sheet(students);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });
  //   const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  //   saveAs(data, "students.xlsx");
  // }
  function handleExportToExcel() {
    // Convert student data to the desired format
    const formattedStudents = students.map(student => ({
      "שם פרטי": student.firstName,
      "שם משפחה": student.lastName,
      "מספר כיתה": student.numClass,
      "מספר הסעה": student.numBus,
      "האם נוסע": student.travel ? "✔" : "✖",
      "סיבה": student.cause,
      "שעת סיום": student.hour,
      "טלפון": student.phone,
      "תחנת איסוף": student.pickupAddress,
      "הערות": student.remark
    }));

    // Create worksheet from the formatted student data
    const worksheet = XLSX.utils.json_to_sheet(formattedStudents);

    // Set the column headers in Hebrew
    worksheet["A1"].v = "שם פרטי";
    worksheet["B1"].v = "שם משפחה";
    worksheet["C1"].v = "מספר כיתה";
    worksheet["D1"].v = "מספר הסעה";
    worksheet["E1"].v = "האם נוסע";
    worksheet["F1"].v = "סיבה";
    worksheet["G1"].v = "שעת סיום";
    worksheet["H1"].v = "טלפון";
    worksheet["I1"].v = "תחנת איסוף";
    worksheet["J1"].v = "הערות";

    // Remove the column for identity card (assuming it was in column C)
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let i = range.s.r; i <= range.e.r; i++) {
      for (let j = 2; j <= range.e.c; j++) {
        const cellAddress = XLSX.utils.encode_cell({ r: i, c: j });
        const newCellAddress = XLSX.utils.encode_cell({ r: i, c: j - 1 });
        worksheet[newCellAddress] = worksheet[cellAddress];
      }
    }
    range.e.c -= 1;
    worksheet["!ref"] = XLSX.utils.encode_range(range);

    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Generate the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "students.xlsx");
  }



  return (
    <div className="AllStudents">
      <h1>תלמידים</h1>
      <button onClick={AddStudent}><BsPersonFillAdd /> </button>
      <button className="ToBack" onClick={goBack}><IoChevronBackCircleSharp /></button>

      <div className="ExportButtons">
        <Button onClick={handleExportToPdf}>PDF יצוא</Button>
        <Button onClick={handleExportToExcel}>Excel יצוא</Button>
      </div>

      <div ref={pdfRef}> {/* Ref for PDF export */}

        <div className="Filters">
          <h3>מיון:</h3>
          <select onChange={handleSortByChange}>
            <option value="bus">לפי מספר אוטובוס</option>
            <option value="class">לפי כיתה</option>
          </select>

          <h3>סינון:</h3>
          <input
            type="text"
            placeholder="כיתה"
            value={classFilter}
            onChange={handleClassFilterChange}
          />
          <input
            type="number"
            placeholder="מספר אוטובוס"
            value={busFilter ?? ""}
            onChange={handleBusFilterChange}
          />
          <input
            type="text"
            placeholder="חיפוש לפי שם משפחה"
            value={letterOrderFilter}
            onChange={handleLetterOrderFilterChange}
          />
          <select value={boardingFilter} onChange={handleBoardingFilterChange}>
            <option value="everyone">הכל</option>
            <option value="boarding">מוסעים</option>
            <option value="not-boarding">לא מוסעים</option>
          </select>
        </div>

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
    </div>

  );
}

export default AllStudents;
