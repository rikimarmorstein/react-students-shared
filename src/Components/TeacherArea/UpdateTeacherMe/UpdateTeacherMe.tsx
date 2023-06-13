import { useNavigate, useParams } from "react-router-dom";
import "./UpdateTeacherMe.css";
import * as yup from 'yup';
import { useState } from "react";
import TeacherUserModel from "../../../Models/TeacherUserModel";
import store from "../../../Redux/Store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schoolDirectorService from "../../../Services/SchoolDirectorService";
import { updateTeacherAction } from "../../../Redux/SchoolDirectorState";
import notify from "../../../Services/NotificationService";
import { TextField } from "@mui/material";
import teacherService from "../../../Services/TeacherService";


function UpdateTeacherMe(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const teacherId: number = Number(params.id);
    const [teacher, setTeacher] = useState<TeacherUserModel>(store.getState().schoolState.teachers.filter(teacher => teacher.id === teacherId)[0]);

    const schema = yup.object().shape({
        firstName: yup.string().required("חסר של פרטי"),
        lastName: yup.string().required("חסר שם משפחה"),
        // phone: yup.string().min(9).max(10).required("יש להזין מספר בין 9-10 ספרות"),
        // password: yup.string().min(4).max(10).required("חובה להכיל מינימום 4 תווים ומקסימום 10 תווים")
    })

    let defaultValueObj = { ...teacher }

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<TeacherUserModel>({
        defaultValues: defaultValueObj,
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendUpdateTeacherMe = (teacher: TeacherUserModel): void => {
        teacherService.updateTeacherMe(teacher).then((res) => {
            store.dispatch(updateTeacherAction(teacher))
            notify.success("מורה עודכן בהצלחה");
            navigate("/teacher/"+ teacher.id);
        }).catch((error) => {
            notify.error(error);
        })
    }

    return (
        <div>
            <form className='UpdateTeacher' onSubmit={handleSubmit(sendUpdateTeacherMe)}>
            <h1>עדכון מורה</h1>

            <label htmlFor="firstName">שם פרטי של המורה</label>
                <TextField {...register("firstName")} id='firstName' type="text" />
                <span>{errors.firstName?.message}</span>

                <label htmlFor="lastName">שם משפחה של המורה</label>
                <TextField {...register("lastName")} id='lastName' type="text"  />
                <span>{errors.lastName?.message}</span>

                {/* <label htmlFor="phone"> טלפון של המורה</label>
                <TextField {...register("phone")} id='phone' type="number"/>
                <span>{errors.phone?.message}</span>

                <label htmlFor="password">סיסמה</label>
                <TextField {...register("password")} id='password' type="text" />
                <span>{errors.password?.message}</span>

                <label htmlFor="numClass">מספר כיתה אליה משויך</label>
                <TextField {...register("numClass")} id='numClass' type="text" />
                <span>{errors.numClass?.message}</span> */}
            
                <div className='vertical-center'>
                    <button disabled={!isValid}>עדכן</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTeacherMe;
