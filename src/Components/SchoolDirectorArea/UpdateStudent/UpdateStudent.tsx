import { useForm } from "react-hook-form";
import StudentUserModel from "../../../Models/StudentUserModel";
import "./UpdateStudent.css";
import { useNavigate, useParams } from "react-router-dom";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import { useEffect, useState } from "react";
import notificationService from "../../../Services/NotificationService";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Cause from "../../../Models/Cause";
import Hour from "../../../Models/Hour";
import store from "../../../Redux/Store";
import { updateStudentsAction } from "../../../Redux/SchoolDirectorState";
import teacherService from "../../../Services/TeacherService";

function UpdateStudent(): JSX.Element {
    const params = useParams();
    const id = +params.studentId;
    const { register, handleSubmit, formState, setValue } = useForm<StudentUserModel>();
    const [travel, setTravel] = useState<boolean>();

    const navigate = useNavigate();

    useEffect(() => {

        schoolDirectorService.getOneStudent(id)
            .then((s) => {
                setValue("firstName", s.data.firstName)
                setValue("lastName", s.data.lastName)
                setValue("phone", s.data.phone)

                setValue("hour", s.data.hour)
                setValue("cause", s.data.cause)
                setValue("pickupAddress", s.data.pickupAddress)
                setValue("studentId", s.data.studentId)
                setValue("remark", s.data.remark)
                setValue("numClass", s.data.numClass)
                setValue("numBus", s.data.numBus)
                setValue("travel", s.data.travel)
                                // setValue("password", s.data.password)

            })
            .catch((err) =>
                notificationService.error(err)
            );
    }, []);
    async function send(student: StudentUserModel) {
        student.id = id;
        try {
            await schoolDirectorService.updateStudent(student);
            notificationService.success("פרטי תלמיד עודכנו בהצלחה");
            store.dispatch(updateStudentsAction(student))

            navigate("/school-director/students");
        } catch (error: any) {
            notificationService.error(error)
        }
    }

    function no() {
        setTravel(true);
        teacherService.isStudentTravel(id);
    }
    function yes() {
        setTravel(false);
    }

    return (
        <div className="UpdateStudent">
			   <form>
                <h2>עדכון תלמיד</h2>

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
                <TextField type="number" {...register("numClass",
                    {
                        min: { value: 0, message: "לא ניתן להכניס מספר שלילי" },
                        required: { value: true, message: "חסר numClass" },
                    })} />
                <span>{formState.errors?.numClass?.message}</span><br /><br />
                <label>מספר הסעה: </label><br />
                <TextField type="number" {...register("numBus",
                    {
                        min: { value: 0, message: "לא ניתן להכניס מספר שלילי" },
                        required: { value: true, message: "חסר numBus" },

                    })} />
                <span>{formState.errors?.numBus?.message}</span><br /><br />

                <label>?האם נוסע: </label>
                <FormControl variant="outlined" style={{ 'width': '100%' }} >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select type="boolean"
                        // defaultValue={}
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
                        // defaultValue={Cause.ABSENCE}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        required {...register("cause")}>

                        <MenuItem value={Cause.ABSENCE}>העדרות</MenuItem>
                        <MenuItem value={Cause.RELEASE}>שחרור</MenuItem>
                        <MenuItem value={Cause.OTHER} >אחר</MenuItem>

                    </Select>
                </FormControl></> : <>{}</>}
                <br />  <br />
                <label>כתובת איסוף: </label><br />
                <TextField type="text" {...register("pickupAddress",
                    {
                        required: { value: true, message: "חסר adress" },

                    })} />
                <span>{formState.errors?.pickupAddress?.message}</span><br /><br />
                <label>הערות: </label><br />
                <TextField type="text" {...register("remark",
                    {
                        required: { value: true, message: "חסר remark" },
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


                <Button onClick={handleSubmit(send)}>שמור</Button>
</form>
        </div>
    );
}

export default UpdateStudent;
