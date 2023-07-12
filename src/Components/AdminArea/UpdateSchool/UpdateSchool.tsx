import { useNavigate, useParams } from "react-router-dom";
import "./UpdateSchool.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import SchoolUserModel from "../../../Models/SchoolUserModel";
import store from "../../../Redux/Store";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import adminService from "../../../Services/AdminService";
import store from "../../../Redux/Store";
import { updateSchoolAction } from "../../../Redux/SchoolDirectorState";

function UpdateSchool(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const schoolId: number = Number(params.id);
    const [school, setSchool] = useState<SchoolUserModel>(store.getState().schoolState.schools.filter(school => school.id === schoolId)[0]);

    const schema = yup.object().shape({
        schoolName: yup.string().required("חסר שם "),
        address: yup.string().required("חסר כתובת "),
        password: yup.string().required("חסר סיסמא"),
        phone: yup.string().required("חסר טלפון")
    })

    let defaultValueObj = { ...school}

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<SchoolUserModel>({
        defaultValues: defaultValueObj,
        mode: "all",
        resolver: yupResolver(schema),
    })

    const sendUpdateSchool = (school: SchoolUserModel): void => {
        adminService.updateSchool(school).then((res) => {
            store.dispatch(updateSchoolAction(school))
            notificationService.success(" עודכן בהצלחה");
            navigate("/admin-area/all-schools");
        }).catch((error) => {
            notificationService.error(error);
        })
    }

    function goBack() {
        navigate("/school-director/teachers")
    }
    return (
        <div className="UpdateSchool">
			 <form className='UpdateTeacher' onSubmit={handleSubmit(sendUpdateSchool)}>
                <button className="ToBack" onClick={goBack}><IoChevronBackCircleSharp /></button>

                <h1>עדכון מורה</h1>

                <label htmlFor="firstName">שם פרטי של המורה</label>
                <TextField {...register("firstName")} id='firstName' type="text" />
                <span>{errors.firstName?.message}</span>

                <label htmlFor="lastName">שם משפחה של המורה</label>
                <TextField {...register("lastName")} id='lastName' type="text" />
                <span>{errors.lastName?.message}</span>

                <label htmlFor="phone"> טלפון של המורה</label>
                <TextField {...register("phone")} id='phone' type="number" />
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

export default UpdateSchool;
