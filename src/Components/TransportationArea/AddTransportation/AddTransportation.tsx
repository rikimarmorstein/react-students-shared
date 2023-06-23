import { useForm } from "react-hook-form";
import "./AddTransportation.css";
import { useNavigate } from "react-router-dom";
import TransportationModel from "../../../Models/TransportationModel";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import notificationService from "../../../Services/NotificationService";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import store from "../../../Redux/Store";
import { addTransportationAction } from "../../../Redux/SchoolDirectorState";

function AddTransportation(): JSX.Element {


    const { register, handleSubmit, formState } = useForm<TransportationModel>();
    const navigate = useNavigate();

    async function send(transportation: TransportationModel) {

        try {
            console.log(transportation);
            await schoolDirectorService.addTransportation(transportation);

            store.dispatch(addTransportationAction(transportation));
            notificationService.success("הסעה נוספה בהצלחה");
            navigate("/school-director/transportation-home/all");
        } catch (error: any) {
            notificationService.error(error);
        }
    }
    return (

        <div className="AddTransportation">
			  <form >

                <h1>הוספת הסעה</h1>

                <label >מספר הסעה</label>
                <TextField type="text" {...register("numBus",
                    {
                        required: { value: true, message: "חסר מספר הסעה" },
                       
                    })} />
                <span>{formState.errors?.numBus?.message}</span>

                <label >תחנות</label>
                <TextField type="text" {...register("stations",
                    {
                        required: { value: true, message: "חסר תחנות" },
                       
                    })} />
                <span>{formState.errors?.stations?.message}</span>
              

                <Button onClick={handleSubmit(send)}>הוספה</Button>

            </form>
        </div>
    );
}

export default AddTransportation;
