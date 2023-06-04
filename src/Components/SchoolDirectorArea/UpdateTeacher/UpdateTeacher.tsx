import { useNavigate, useParams } from "react-router-dom";
import "./UpdateTeacher.css";
import * as yup from 'yup';
import { useState } from "react";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import store from "../../../Redux/Store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import { updateTeacherAction } from "../../../Redux/SchoolDirectorState";
import notify from "../../../Services/NotificationService";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


function UpdateTeacher(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const teacherId: number = Number(params.id);
    const [teacher, setTeacher] = useState<TeacherUserModel>(store.getState().schoolState.teachers.filter(teacher => teacher.id === teacherId)[0]);

    const schema = yup.object().shape({
        firstName: yup.string().required("חסר של פרטי"),
        lastName: yup.string().required("חסר שם משפחה"),
        phone: yup.number().min(9).max(10).required("יש להזין מספר בין 9-10 ספרות"),
        password: yup.string().min(4).max(10).required("חובה להכיל מינימום 4 תווים ומקסימום 10 תווים"),
        // numClass: yup.number()
    })

    let defaultValueObj = { ...teacher }

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<TeacherUserModel>({
        defaultValues: defaultValueObj,
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendUpdateTeacher = (teacher: TeacherUserModel): void => {
        schoolDirectorService.updateTeacher(teacher).then((res) => {
            notify.success("מורה עודכן בהצלחה");
            store.dispatch(updateTeacherAction(teacher))
            navigate("/school-director");
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <h1>עדכון מורה</h1>
            <form className='UpdateTeacher' onSubmit={handleSubmit(sendUpdateTeacher)}>

            <label htmlFor="firstName">שם פרטי של המורה</label>
                <TextField {...register("firstName")} id='firstName' type="text" />
                <span>{errors.firstName?.message}</span>

                <label htmlFor="lastName">שם משפחה של המורה</label>
                <TextField {...register("lastName")} id='lastName' type="text"  />
                <span>{errors.lastName?.message}</span>

                <label htmlFor="phone"> טלפון של המורה</label>
                <TextField {...register("phone")} id='phone' type="number"/>
                <span>{errors.phone?.message}</span>

                <label htmlFor="password">סיסמה</label>
                <TextField {...register("password")} id='password' type="text" />
                <span>{errors.password?.message}</span>

                <label htmlFor="numClass">מספר כיתה אליה משויך</label>
                <TextField {...register("numClass")} id='numClass' type="text" />
                <span>{errors.numClass?.message}</span>
            
                <div className='vertical-center'>
                    <button disabled={!isValid}>עדכן</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTeacher;
