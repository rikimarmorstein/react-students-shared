import "./AddTeacher.css";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import { addTeacherAction } from "../../../Redux/SchoolDirectorState";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


function AddTeacher(): JSX.Element {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        firstName: yup.string().required("חסר של פרטי"),
        lastName: yup.string().required("חסר שם משפחה"),
        phone: yup.string().min(9).max(10).required("יש להזין מספר בין 9-10 ספרות"),
        password: yup.string().min(4).max(10).required("חובה להכיל מינימום 4 תווים ומקסימום 10 תווים"),
        numClass: yup.number()
    })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<TeacherUserModel>({
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendTeacher = (teacher: TeacherUserModel): void => {
        schoolDirectorService.addTeacher(teacher).then((res) => {
            store.dispatch(addTeacherAction(teacher));
            notify.success("מורה נוסף בהצלחה");
            navigate("/school-director");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <h1>הוספת מורה</h1>
            <form className='AddTeacher' onSubmit={handleSubmit(sendTeacher)}>

                <label htmlFor="firstName">שם פרטי של המורה</label>
                <TextField {...register("firstName")} id='firstName' type="text" placeholder='הזן את שם הפרטי של המורה' />
                <span>{errors.firstName?.message}</span>

                <label htmlFor="lastName">שם משפחה של המורה</label>
                <TextField {...register("lastName")} id='lastName' type="text" placeholder='הזן את שם המשפחה של המורה' />
                <span>{errors.lastName?.message}</span>

                <label htmlFor="phone"> טלפון של המורה</label>
                <TextField {...register("phone")} id='phone' type="number" placeholder='הזן מספר טלפון' />
                <span>{errors.phone?.message}</span>

                <label htmlFor="password">סיסמה</label>
                <TextField {...register("password")} id='password' type="text" placeholder='הזן סיסמה חד פעמית' />
                <span>{errors.password?.message}</span>

                <label htmlFor="numClass">מספר כיתה אליה משויך</label>
                <TextField {...register("numClass")} id='numClass' type="number" placeholder='הזן מספר כיתה שאליה המורה משויך' />
                <span>{errors.numClass?.message}</span>

                <button disabled={!isValid}>הוספה</button>

            </form>
        </div>
    );
}

export default AddTeacher;
