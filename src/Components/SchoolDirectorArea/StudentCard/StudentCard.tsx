import StudentUserModel from "../../../Models/StudentUserModel";
import store from "../../../Redux/Store";
import "./StudentCard.css";

interface StudentCardProps {
  student: StudentUserModel;
}
function StudentCard(props: StudentCardProps): JSX.Element {

  return (
    <div className="StudentCard">
      {/* <div> */}
      {/* <table>
          <tr>  
                <th>שם</th>
               <th> phone</th>
             <th>   hour:</th>
          </tr>          
          
             <tr>  
                <td> {props.student.firstName}</td>
               <td> phone: {props.student.phone}</td>
             <td>   hour: {props.student.hour}</td>
          </tr>  </table>
          </div>	 */}
    </div>
  );
}

export default StudentCard;
