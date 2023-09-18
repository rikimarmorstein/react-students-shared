import { useForm } from "react-hook-form";
import "./AddStudent.css";
import { useNavigate } from "react-router-dom";
import StudentUserModel from "../../../Models/StudentUserModel";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import notificationService from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { addStudentsAction } from "../../../Redux/SchoolDirectorState";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Cause from "../../../Models/Cause";
import Hour from "../../../Models/Hour";
import { IoChevronBackCircleSharp } from "react-icons/io5";


function AddStudent(): JSX.Element {

    const [travel, setTravel] = useState<boolean>();

    const { register, handleSubmit, formState } = useForm<StudentUserModel>();
    const navigate = useNavigate();

    function goBack() {
        navigate("/school-director/students")
    }

    async function send(student: StudentUserModel) {

        try {
            console.log(student);
            await schoolDirectorService.addStudent(student);

            store.dispatch(addStudentsAction(student));
            notificationService.success("תלמיד נוסף בהצלחה");
            navigate("/school-director/students");
        } catch (error: any) {
            notificationService.error(error);
        }
    }

    const [availableShuttles, setAvailableShuttles] = useState<number[]>([]);

    useEffect(() => {
        schoolDirectorService.getAvailableShuttleNumbers().then((shuttles) => {
            setAvailableShuttles(shuttles.data);
            console.log(shuttles.data);
        }).catch((error) => {
            notificationService.error(error);
        });
    }, []);

    function no() {
        setTravel(true);
    }
    function yes() {
        setTravel(false);
    }
    return (
        <div className="AddStudent">
            <button className="ToBack" onClick={goBack}><IoChevronBackCircleSharp /></button>

            <form>
                <h2>הוספת תלמיד</h2>

                <label>מספר זהות:</label><br />
                <TextField type="number" {...register("studentId",
                    {
                        required: { value: true, message: "חסר מספר זהות" },
                        minLength: {
                            value: 9, message: "חייב להכיל 9 ספרות"
                        }
                    })} />
                <span>{formState.errors?.id?.message}</span><br /><br />

                <label>שם פרטי: </label><br />
                <TextField type="text" {...register("firstName",
                    {
                        required: { value: true, message: "חסר שם פרטי" }
                    })} />
                <span>{formState.errors?.firstName?.message}</span><br /><br />

                <label>שם משפחה: </label><br />
                <TextField type="text" {...register("lastName",
                    {
                        required: { value: true, message: "חסר שם משפחה" }

                    })} />
                <span>{formState.errors?.lastName?.message}</span><br /><br />

                <label>שם ההורה: </label><br />
                <TextField type="text" {...register("parentName",
                    {
                        required: { value: true, message: "חסר שם ההורה" }

                    })} />
                <span>{formState.errors?.parentName?.message}</span><br /><br />


                <label>טלפון: </label><br />
                <TextField type="number" {...register("phone",
                    {
                        min: { value: 0, message: "לא ניתן להכניס מספר שלילי" },
                        required: { value: true, message: "חסר טלפון" },
                        minLength: {
                            value: 9, message: "חובה להכיל מינימום 9 ספרות"
                        }
                    })} />
                <span>{formState.errors?.phone?.message}</span><br /><br />

                <label>מספר כיתה: </label><br />
                <TextField type="text" {...register("numClass",
                    {
                        required: { value: true, message: "  חסר מספר כיתה" },
                    })} />
                {/* <TextField type="number" {...register("numClass",
                    {
                        min: { value: 0, message: "לא ניתן להכניס מספר שלילי" },
                        required: { value: true, message: "חסר numClass" },
                    })} /> */}
                <span>{formState.errors?.numClass?.message}</span><br /><br />
                {/* <label>מספר הסעה: </label><br />
                <TextField type="number" {...register("numBus",
                    {
                        min: { value: 0, message: "לא ניתן להכניס מספר שלילי" },
                        required: { value: true, message: "חסר מספר הסעה" },

                    })} />
                    
                <span>{formState.errors?.numBus?.message}</span><br /><br /> */}
                <label>מספר הסעה: </label><br />
                <FormControl variant="outlined" style={{ 'width': '100%' }} >
                    <InputLabel id="demo-simple-select-outlined-label">יש לבחור מספר הסעה</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        required
                        {...register("numBus")}
                    >
                        {availableShuttles.map((shuttleNumber: number) => (
                            <MenuItem key={shuttleNumber} value={shuttleNumber}>{shuttleNumber}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <span>{formState.errors?.numBus?.message}</span><br /><br />

                <label>?האם נוסע: </label>
                <FormControl variant="outlined" style={{ 'width': '100%' }} >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select type="boolean"
                        defaultValue={true}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        required {...register("travel")}>
                        <MenuItem value={true as any} onClick={yes}>כן</MenuItem>
                        <MenuItem value={false as any} onClick={no}>לא</MenuItem>

                    </Select>
                </FormControl><br />
                {travel === true ? <><FormControl variant="outlined" style={{ 'width': '100%' }} >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                        defaultValue={Cause.ABSENCE}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        required {...register("cause")}>

                        <MenuItem value={Cause.ABSENCE}>העדרות</MenuItem>
                        <MenuItem value={Cause.RELEASE}>שחרור</MenuItem>
                        <MenuItem value={Cause.OTHER} >אחר</MenuItem>

                    </Select>
                </FormControl></> : <></>}
                <br />  <br />
                <label>כתובת איסוף: </label><br />
                <TextField type="text" {...register("pickupAddress",
                    {
                        required: { value: true, message: "חסר כתובת" },

                    })} />
                <span>{formState.errors?.pickupAddress?.message}</span><br /><br />
                <label>הערות: </label><br />
                <TextField type="text" {...register("remark",
                    {
                        // required: { value: true, message: "חסר remark" },
                    })} />
                <span>{formState.errors?.remark?.message}</span><br /><br />
                <FormControl variant="outlined" style={{ 'width': '100%' }} >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                        defaultValue={Hour.SIXTEEN}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        required {...register("hour")}>
                        <MenuItem value={Hour.SIXTEEN} >13:00 </MenuItem>
                        <MenuItem value={Hour.THIRTEEN} >16:00</MenuItem>

                    </Select>
                </FormControl><br /><br />
                {/* <label>סיסמא: </label><br />
                <TextField type="text" {...register("password",
                    {
                        required: { value: true, message: "חסר password" },

                    })} />
                <span>{formState.errors?.password?.message}</span><br /><br /> */}


                <Button onClick={handleSubmit(send)}>הוספה</Button>

            </form>
        </div>
    );
}

export default AddStudent;
