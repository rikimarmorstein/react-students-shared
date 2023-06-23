import { useEffect, useState } from "react";
import "./TransportationList.css";
import TransportationModel from "../../../Models/TransportationModel";
import { NavLink, useNavigate } from "react-router-dom";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService"

function TransportationList(): JSX.Element {
    
    const [transportations, setTransportations] = useState<TransportationModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        schoolDirectorService.getAllTransportations().then((res) => {
            setTransportations(res);
        }).catch((error) => {
            notify.error(error);
        })
    }, []);

    return (
        <div className="TransportationList">
			<table>
                    {/* <thead> */}
                        <tr>
                            <th> מספר הסעה </th> 
                            <th> תחנות </th>
                           
                        </tr>
                    {/* </thead>
                    <tbody> */}
                        {transportations.map((transportation) => (
                            <tr>
                                <td> {transportation.numBus} </td>
                                <td> {transportation.stations} </td>
                              
                                {/* <td> <NavLink to={"/school-director/"}>ב</NavLink></td> */}
                            </tr>
                        ))}
                    {/* </tbody> */}
                </table>

        </div>
    );
}

export default TransportationList;
